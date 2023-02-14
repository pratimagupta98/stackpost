

exports.add_fb_profile = async (req, res) => {
  var request = require('request');

  key = "d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4"
  sid = "sveltosetechnologies2"
  token = "856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e	"
  from = req.body.from
  to = req.body.to



  const formUrlEncoded = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
  const axios = require('axios')
  url = "https://api.exotel.com/v1/Accounts/sveltosetechnologies2/Calls/a2f80c3aec91e3747a14198d32ae16bu.json"
  axios.get(url, { headers: { "Authorization": 'Basic ZDkwOWUyZTAxMjBkMGJjYmQyZWY3OTVkZDE5ZWIyZTk3YzJmOGQ3OGQ4ZWJiNmQ0Ojg1NjM3MWZlNmE5N2U4YmU4ZmVkNmFiMTRjOTViNDgzMmY4MmQxZDMxMTZjYjE3ZQ==' } },
    formUrlEncoded({


      "CallerId": '080-473-59942',
      "CallerType": 'promo',


    }),
    {
      withCredentials: true,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ZDkwOWUyZTAxMjBkMGJjYmQyZWY3OTVkZDE5ZWIyZTk3YzJmOGQ3OGQ4ZWJiNmQ0Ojg1NjM3MWZlNmE5N2U4YmU4ZmVkNmFiMTRjOTViNDgzMmY4MmQxZDMxMTZjYjE3ZQ=='
      }
    },
  )
    .then(async (response) => {
      console.log(`statusCode: ${res.statusCode}`)
      console.log("RES", response)
      res.status(200).json({
        status: true,
        msg: "success",
        data: response.data,
      })

    })

  //         .catch((error) => {
  //           console.error(error)
  //         })
  // .then((res) => {
  //   console.log(`statusCode: ${res.statusCode}`)
  //   console.log(res)
  // })
}

exports.add_fb_post = async (req, res) => {
  const fetch = require("node-fetch");
  const API_KEY = "6D7WPF5-5RX4JC2-JWHH12G-GP84J41";

  fetch("https://app.ayrshare.com/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify(
      {
      //  "post": "The best FB post ever #best https://www.facebook.com",
      "post": req.body.post,  
      //  "mediaUrls": ["https://img.ayrshare.com/012/gb.jpg"],
      "mediaUrls" : req.body.mediaUrls,
        "platforms": ["facebook"]
    }
    ),
  })
    .then((res) => res.json())
    .then((json) =>{
res.status(200).json({
  data : json
})
    }
     //console.log("json",json)
     )
    
    // res.json
   // res.send(json)
  //  res.status(200).json({
  //   data
  //  })
    .catch(console.error);
}
 

exports.history = async (req, res) => {
  const fetch = require("node-fetch");
  const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";
  
  fetch("https://app.ayrshare.com/api/history", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${API_KEY}`
        }
      })
        .then((res) => res.json())
        .then((json) => {
          res.send(json)
          //  console.log(json)
        })
      
        .catch(console.error);
  }


  exports.delete_post = async (req, res) => {
    const fetch = require("node-fetch");
    const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";
  
    fetch("https://app.ayrshare.com/api/post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(
        {
        //  "post": "The best FB post ever #best https://www.facebook.com",
        "id": req.body.id,  
        // //  "mediaUrls": ["https://img.ayrshare.com/012/gb.jpg"],
        // "mediaUrls" : req.body.mediaUrls,
        //   "platforms": ["facebook"]
      }
      ),
    })
      .then((res) => res.json())
      .then((json) =>{
  res.status(200).json({
    data : json
  })
      }
       //console.log("json",json)
       )
      
    
      .catch(console.error);
  }


  exports.Profile = async (req, res) => {
  const fetch = require("node-fetch");
const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";

fetch("https://app.ayrshare.com/api/profiles", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch(console.error);
  }

  exports.auto_schedule = async (req, res) => {
  const fetch = require("node-fetch");
const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";

fetch("https://app.ayrshare.com/api/auto-schedule/set", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        schedule: req.body.schedule,
        //["13:05Z", "20:14Z"],  // required
        title: "facebook  Schedule"     // optional 
      }),
    })
      .then((res) => res.json())
      .then((json) =>
      // console.log(json)
      res.status(200).json({
        data : json
      })
      )
      .catch(console.error);

  }



  exports.auto_schedule_list = async (req, res) => {
  const fetch = require("node-fetch");
const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";

fetch("https://app.ayrshare.com/api/auto-schedule/list", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        res.status(200).json({
          data : json
        })
      }
      //console.log(json)
      )
      .catch(console.error);
  }

  exports.get_profile_key = async (req, res) => {
  const fetch = require("node-fetch");
const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";

fetch("https://app.ayrshare.com/api/profiles", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
      .then((res) => res.json())
      .then((json) => {
        res.status(200).json({
          data : json
        })
      }
     // console.log(json)
      )
      .catch(console.error);

  }

  exports.create_profile_key = async (req, res) => {
  const fetch = require("node-fetch");
const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";

fetch("https://app.ayrshare.com/api/profiles/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        title: "ACME Profile", // required
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch(console.error);
  }


  exports.add_instagram_post = async (req, res) => {
    const fetch = require("node-fetch");
    const API_KEY = "2SH3942-TTMME2V-KT7N36F-ZV13NY2";
  
    fetch("https://app.ayrshare.com/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(
        {
          "post": "The best IG ever #best #aweome https://www.instagram.com",
          "mediaUrls": ["https://img.ayrshare.com/012/gb.jpg"],
          "platforms": ["instagram"]
      }
      ),
    })
      .then((res) => res.json())
      .then((json) =>{
  res.status(200).json({
    data : json
  })
      }
       //console.log("json",json)
       )
      
      // res.json
     // res.send(json)
    //  res.status(200).json({
    //   data
    //  })
      .catch(console.error);
  }