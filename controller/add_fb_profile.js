

exports.add_fb_profile = async (req, res) => {
    var request = require('request');
    
        key="d909e2e0120d0bcbd2ef795dd19eb2e97c2f8d78d8ebb6d4"
        sid="sveltosetechnologies2"
        token="856371fe6a97e8be8fed6ab14c95b4832f82d1d3116cb17e	"
        from=req.body.from     
        to=req.body.to
        
     
    
        const formUrlEncoded = x =>Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
        const axios = require('axios')
        url="https://api.exotel.com/v1/Accounts/sveltosetechnologies2/Calls/a2f80c3aec91e3747a14198d32ae16bu.json"
        axios.get(url, {headers:{"Authorization":'Basic ZDkwOWUyZTAxMjBkMGJjYmQyZWY3OTVkZDE5ZWIyZTk3YzJmOGQ3OGQ4ZWJiNmQ0Ojg1NjM3MWZlNmE5N2U4YmU4ZmVkNmFiMTRjOTViNDgzMmY4MmQxZDMxMTZjYjE3ZQ=='}},
           formUrlEncoded({
       
    
          "CallerId":'080-473-59942',
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
          .then(async(response) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log("RES",response)
            res.status(200).json({
              status:true,
              msg:"success",
              data : response.data,
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