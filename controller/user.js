const User = require("../models/user");
const resp = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const axios = require("axios");
// const httpService=require('ht')

exports.signup = async (req, res) => {
	const { email, mobile, password } = req.body;
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);
	const newUser = new User({
		email: email,
		mobile: mobile,
		password: hashPassword,
	});
	const findexist = await User.findOne({ email: email });
	if (findexist) {
		resp.alreadyr(res);
	} else {
		newUser
			.save()
			.then((data) => resp.successr(res, data))
			.catch((error) => resp.errorr(res, error));
	}
};
exports.login = async (req, res) => {
	const { email, password, username } = req.body;
	const user = await User.findOne({
		//  $or: [{ email: email }, { username: username }],
		$and: [{ $or: [{ email: email }, { username: username }] }],
	});
	console.log("user", user);
	if (user) {
		const validPass = await bcrypt.compare(password, user.password);
		if (validPass) {
			res.status(200).send({
				status: true,
				msg: "success",
				user: user,
			});
		} else {
			res.status(400).json({
				status: false,
				msg: "Incorrect Password",
				error: "error",
			});
		}
	} else {
		res.status(400).json({
			status: false,
			msg: "User Doesnot Exist",
			error: "error",
		});
	}
};

//Login with google
exports.loginWithGoogle = async (req, res) => {

	let responce = await axios.post(
		`https://oauth2.googleapis.com/token`,

		{},
		{
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			params: {
				...req.body,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				grant_type: "authorization_code",
			},
		}
	);
	responce = await axios.get(
		`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${responce.data.access_token}`
	);

	if(responce){
		let obj = {
			email: responce.data.email,
			emailVerify: true,
			firstName: responce.data.given_name,
			lastName: responce.data.family_name,
			profilePicture: responce.data.picture,
		  };


		 await User.findOneAndUpdate({ email: obj.email },{
			upsert:true
		})
		
	res.send(obj);

	}else{
		res.status(500).send({message:"login Server error"})
	}

	

  
};

// login with linkedin
exports.loginWithLinkedin = async (req, res) => {
	try {
		const resp = await axios.post(
			"https://www.linkedin.com/oauth/v2/accessToken",
			{
				code: req.body.code,
				redirect_uri: req.body.redirect_uri,
				client_id: process.env.LINKEDIN_CLIENT_ID,
				client_secret: process.env.LINKEDIN_CLIENT_SECRET,
				grant_type: "authorization_code",
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				
			}
		);

		const getUserProfile = async (token) => {
			let header = {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${token}`
			};
			try {
				return await Promise.all([
          axios.get(
            `https://api.linkedin.com/${CONSTANTS.LINKEDIN_APIS.GET_EMAIL}`,
			{ headers: header },
          ),
          axios.get(
            `https://api.linkedin.com/${CONSTANTS.LINKEDIN_APIS.GET_USER_INFO}`,
			{ headers: header },
          ),
        ]);

			} catch (err) {
				console.log('Err', err);
				throw err
			}
		}
		reseponce= await getUserProfile(resp.data.access_token)

		if (reseponce) {
			for (let propName in reseponce[1].data.firstName.localized) {
			  firstNameLocalized = reseponce[1].data.firstName.localized[propName]
			  lastNameLocalized = reseponce[1].data.lastName.localized[propName]
			}
		
			data = {
			  ...reseponce[0].data.elements[0]['handle~'],
			  email:reseponce[0].data.elements[0]['handle~'].emailAddress,
			  firstName: firstNameLocalized,
			  lastName: lastNameLocalized,
			  linkedinId: reseponce[1].data.id,
			  profilePicture: reseponce[1].data.profilePicture ? reseponce[1].data.profilePicture['displayImage~'].elements[1].identifiers[0].identifier : ''
			}
			await User.findOneAndUpdate({ email: data.email },{
				upsert:true
			})

		res.status(200).send(data)

		  }else{
			res.status(500).send({message:"Server Error"})
		  }		
		
	} catch (error) {
		res.send(error)
	}
};

// login with facebook
exports.loginWithFaceBook=async (req,res)=>{
try {
	console.log('req.body',req.body)
		let resp = await axios.post(
			`https://graph.facebook.com/v12.0/oauth/access_token`,
			{
					code: req.body.code,
					redirect_uri: req.body.redirect_uri,
					client_id: process.env.FACEBOOK_CLIENT_ID,
					client_secret: process.env.FACEBOOK_CLIENT_SECRET
				
			},
			{
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
			
			}
		);

		responce = await axios.get(
			`https://graph.facebook.com/v12.0/me?access_token=${resp.data.access_token}&fields=id,name,email,first_name,last_name`,
		);
		if(responce){
			let obj = {
				email: responce.data.email,
				emailVerify: true,
				firstName: responce.data.first_name,
				lastName: responce.data.last_name,
			  };
	
	
			 await User.findOneAndUpdate({ email: obj.email },{
				upsert:true
			})	
		res.status(200).send(obj)
	
		}else{
			res.status(500).send({message:"login Server error"})
		}
	
} catch (error) {
	console.log("eer",error)
	res.status(500).send({
		status:false,
		message:error,
		error:error.data
	})
}
}


const passport = require("passport");
const facebookTokenStrategy = require("passport-facebook-token");
const Usser = require("../models/fbUser");
//const CONSTANTS = require("./constants/constants");
exports.login_fb = async (req, res) => {
	passport.use(
		"facebookToken",
		new facebookTokenStrategy(
			{
				clientID: process.env.FACEBOOK_APP_ID,
				clientSecret: process.env.FACEBOOK_APP_SECRET,
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const existingUser = await Usser.findOne({
						"facebook.id": profile.id,
					});

					if (existingUser) {
						return done(null, existingUser);
					}

					const newUser = new Usser({
						method: "facebook",
						facebook: {
							id: profile.id,
							email: profile.emails[0].value,
							token: accessToken,
						},
					});
					console.log("newUser", newUser);
					await newUser.save();
					done(null, newUser);
				} catch (error) {
					done(error, false);
				}
			}
		)
	);
};
