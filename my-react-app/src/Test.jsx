function Test(props){
    let test = props.authenticated?'yes':'no';
    return(
        <>
            <h1>Ooops {test},.. you are not supposed to be here, try to <a href="/Login">Log In</a>😊 </h1>
        </>
    );
}

export default Test;
//test