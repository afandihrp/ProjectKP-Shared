export default class dataFetch{

    /**
     *  @param {string} url - url string for fetch api,example: '/api/blabla.'
     *  @param {object} body - the body payload for fetch api, example: {key: value} and etc, if using get just insert null.
     *  @param {string} method - choose fetch api mode GET, POST, PUT, PATCH, DELETE in string.
     *  @param {object} header - header the of http request, by default will be content app/json if not filled and it is optional
     *  @example const example = new dataFetch(url,body,method,header);
     *  @tutorial 
     *  header is optional
     *  available methods: makeRequest.
     *  for methods always use async/await!
    */

    
    constructor(url,body, method, header = {'Content-Type': 'application/json'}){
        this.backendUrl =`http://environment-relief.gl.at.ply.gg:24588`;
        this.url = this.backendUrl+url;
        this.method = method
        this.credentials = 'include';
        
        
        this.header = {
            ...header,
        }
        this.body = body;
    }


    async _refreshToken()
    {
        const url = this.backendUrl+'/login/refresh';

        console.log(`attempting to refresh token`);
        const options = {
            method: 'GET',
            credentials: 'include'
        };
        try
        {
            const res = await fetch(url,options);
            if(!res.ok) {
                console.log(`Oops, something has gone wrong ${res.status}`);
                // await fetch(this.backendUrl+'/login/logout',options);
                return `Oops, something has gone wrong`;
            }
            return this.makeRequest();
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
     * - use async/await!
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
            // await this.refreshToken();
            const res = await fetch(this.url,options)
            // const responseText = await res.clone().text();
            // console.log("Raw Server Response:", responseText);
            if(res.status === 401)
            {
                console.log(`token expired`);
                return await this._refreshToken();
            }
            if(!res.ok) return{data: res.status, err: true};
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                console.log("Response is JSON. Parsing as JSON.");
                const data = await res.json();
                return{data: data, err: false, status: res.status};
            } 
            else {
                console.log("Response is NOT JSON. Parsing as text.");
                const data = await res.text();
                return{data: data, err: false, status: res.status};
            }
            // console.log(data);
            // return{data: data, err: false};
            
        }
        catch(err){
            console.log(`Oops, something has gone wrong: ${err}`)
            return {data: err, err: true};
        }
    }
    
}