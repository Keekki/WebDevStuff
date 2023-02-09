const url = 'http://localhost:5000/api/collectors/';
const formEl = document.querySelector("form");
      formEl.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);
        const formDataSerialized = Object.fromEntries(formData);
        const jsonObject = {
          ...formDataSerialized,
          trading: formDataSerialized.trading ? true : false,
        };
        
        try {
          
          const response = await fetch(url, {

            method: "POST",
            body: JSON.stringify(jsonObject),
            

            headers: {
              "Content-Type": "application/json",
            },
            
          });
          if (!response.ok) {
            throw new Error (response.statusText)
        } else {
          //console.log("all good")
          alert("Collector added successfully!")
        }
          const json = await response.json();
          
        } catch (error) {
         console.log(error);
         alert("Connection failed. Check server status") 
        }
        
        window.location.reload()
      });