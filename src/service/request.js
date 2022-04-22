let request = {};

request.request = async function (url, data, method) {
  
  let option = {
    headers:{
      'Content-Type':"application/json"
    },  
    method: method,
    body: JSON.stringify(data),
  };
  if (method === "GET") {
    delete option.body;
  }
  let res = await fetch(url, option);
  let rs = await res.json();

  return rs;
};

export default request;
