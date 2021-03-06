export default async function(access){
    console.log("called");
    let JWT = localStorage.getItem("JWT");
    console.log(JWT);
    if(!JWT){
        return false;
    }else{
        let fetched = await fetch("https://runaway-practicum.herokuapp.com/api/findUser", {
            headers: { Authorization: `JWT ${JWT}` }
        });
        fetched = await fetched.json();
        if(fetched){
            if(fetched.access === access || fetched.access === "admin"){
                return true;
            }
        }
        console.log("denied");
        return false;
    }
}