import categories from "./db";
import axios from "axios";

const tok = "https://public-apis-api.herokuapp.com/api/v1/auth/token";
let token;
let finalcategories = [];
let i = 1;
let limit = 9;
let ct=1;


var globalData;
const keyfetch = async () => {
  try {
    const data = await axios(tok);
    globalData = data;
  } catch (err) {
    console.log(err);
  }
};

setInterval(keyfetch, 270000);

const sleeper = (ms) => {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }
  

const show = async () => {
  await keyfetch();

  async function categoryfetch() {
    while (i < 6) {
    const api = `https://public-apis-api.herokuapp.com/api/v1/apis/categories?page=${i}`;

      await axios
        .get(api, {
          headers: { Authorization: `Bearer ${globalData.data.token}` },
        })
        .then((res) => {
          if (res.data.categories?.length === 0) {
            return;
          }
          finalcategories = finalcategories.concat(res.data.categories);
        })
         .then(sleeper(6000))
        .catch((error) => {
          console.log(error);
        });

      i++;
    }
    console.log(finalcategories);

    for (let i = 0; i <finalcategories.length; i++) {
      let currdata = {};
      const catlink = `https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=1&category=${finalcategories[i]}`;
      let arr = [];
      
    //   ct++;
    //   if(ct % 9 == 0)
    //   {
    //     await sleeper(60000);
    //   }

      
      await axios
        .get(catlink, {
          headers: { Authorization: `Bearer ${globalData.data.token}` },
        })
        .then((res) => {
          currdata = res;
        })
         .then(sleeper(6000))
        .catch((error) => {
          console.log(error);
        });

      // console.log(currdata.data);

      let currCount = currdata.data.count;
      let totalloop = currCount / 10 + 1;
      arr = arr.concat(currdata.data.categories);
      for (var j = 2; j < totalloop; j++) {
        let datadetail = `https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=${j}&category=${finalcategories[i]}`;
        
    //   ct++;
    //   if(ct % 9 == 0)
    //   {
    //     await sleeper(60000);
    //   }
            
        await axios
          .get(datadetail, {
            headers: { Authorization: `Bearer ${globalData.data.token}` },
          })
          
          .then((resp) => {
            arr = arr.concat(resp.data.categories);
          })
           .then(sleeper(6000))
          .catch((error) => {
            console.log(error);
          });

        
      }

      if (arr.length !== 0) 
      {
        (async () => {
            await axios.post("http://localhost:8080/senddata", arr).then(sleeper(1000));
        })();
    }
      //console.log("succcccccccc",arr);
    }
  }
  categoryfetch();
};

export { show };
