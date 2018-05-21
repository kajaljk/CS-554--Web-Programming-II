function downloadUrls(urls) {

    const results = urls.map(async (url) =>  { return await download(url) });
  
  };
//   function downloadUrls(urls) {

//     const results =  await Promise.all(urls.map(url =>  download(url));
  
//   };
// async function downloadUrls(urls) {

//     const results =  urls.map(async (url) =>   return download(url); });
  
//   };


function multiply(x, y = 2, z = 3) {

    return x * y * z;
  }

  console.log(multiply(7, 3));

//   console.log(multiply(10.75));
//   console.log(multiply(12, 2));


  const { result } = { result: 17 };
  console.log(result);
//     const result1 = { result: 17 };
//     console.log(result1);

    // const ...result2 = { result: 17 };
    // console.log(result2);


    const baseObject = { a: 12, b: 17, c: -1, d: "apple" }

  
  
    // const {a, b, c, ...rest } = baseObject;
    // console.log(rest);
    const {a, d, ...rest } = baseObject;
    console.log(rest);
    // const {a, f, ...rest } = baseObject;
    // console.log(rest);


    const first = {
        x: 12,
              z: "batman"
            };
      const second = {
        f: 16,      
        z: "panda"     
      }
      const third = {      
        y: 17,
              z: "zubat"      
      }

      const result1 = { ...third, ...first, ...second };
      console.log(result1);
    const result2 = { ...first, ...second, ...third };
    console.log(result2);
    
    const result3 = { ...second, ...first, ...third };
    console.log(result3);
    
    
