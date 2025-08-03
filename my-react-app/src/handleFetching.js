export default class dataFetch{

    /**
     *  @param {string} url - url string for fetch api,example: '/api/blabla.'
     *  @param {object} body - the body payload for fetch api, example: {key: value} and etc, if using get just insert null.
     *  @param {string} method - choose fetch api mode GET, POST, PUT, PATCH, DELETE in string.
     *  - class usage example: const example = new dataFetch(url,body,method)
     *  - available methods: makeRequest, refreshToken.
    */

    
    constructor(url,body, method){
        this.backendUrl =`http://environment-relief.gl.at.ply.gg:24588`;
        this.url = this.backendUrl+url;
        this.method = method
        this.credentials = 'include';
        
        
        this.header = {
            'Content-Type': 'application/json'
        }
        this.body = body;
    }

    async refreshToken()
    {
        const url = this.backendUrl+'/login/refresh';

        console.log(`attempting to refresh token with: ${url}`);
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        try
        {
            const res = await fetch(url,options);
            if(!res.ok) {
                console.log(`Oops, something has gone wrong`);
                // await fetch(this.backendUrl+'/login/logout',options);
                return `Oops, something has gone wrong`;
            }
            return `ok`;
        }
        catch(err)
        {
            console.log(`Oops, something has gone wrong: ${err}`)
            return `Oops, something has gone wrong`
        }
    }


    /**
     * 
     * @returns - returns response object of {data: `data` or false, err: `err msg` or false, and responds as res }
     * example await object.makeRequest();
     */
    async makeRequest(){
        // console.log(this.url,this.method,this.header,this.body);
        const options = {
            method: this.method,
            credentials: 'include',
            headers: this.header
        };

        if (this.method !== 'GET' && this.body) {
            options.body = JSON.stringify(this.body);
        }

        try{
            await this.refreshToken();
            const res = await fetch(this.url,options)
            // const responseText = await res.clone().text();
            // console.log("Raw Server Response:", responseText);
            if(res.status === 401)
            {
                console.log(`token expired`);
                // return await this.refreshToken();
            }
            if(!res.ok) return{data: res.status, err: true};
            const data = await res.json();
            // console.log(data);
            return{data: data, err: false};
            
        }
        catch(err){
            console.log(`Oops, something has gone wrong: ${err}`)
            return {data: err, err: true};
        }
    }
    
}