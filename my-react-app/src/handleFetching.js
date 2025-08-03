import { hasPermission } from './role';

export default class dataFetch{

    /**
     *  @param {string} url - url string for fetch api,example: '/api/blabla.'
     *  @param {object} body - the body payload for fetch api, example: {key: value} and etc, if using get just insert null.
     *  @param {string} token - insert the token here only string.
     *  @param {string} method - choose fetch api mode GET, POST, PUT, PATCH, DELETE in string.
     *  - class usage example: const example = new dataFetch(url,body,token,method)
     *  - available methods: makeRequest.
    */

    
    constructor(url,body, token, method){
        this.url = `http://environment-relief.gl.at.ply.gg:24588${url}`;
        this.method = method
        this.token = token;
        this.credentials = 'include';
        
        
        this.header = {
            'Content-Type': 'application/json',
            'Authorization': `BEARER ${this.token}` 
        }
        this.body = body;
    }


    /**
     * 
     * @returns - returns response object of {data: `data` or false, err: `err msg` or false }
     */
    async makeRequest(){
        // console.log(this.url,this.method,this.header,this.body);
        const options = {
            method: this.method,
            credentials: this.credentials,
            headers: this.header
        };

        if (this.method !== 'GET' && this.body) {
            options.body = JSON.stringify(this.body);
        }

        try{
            const res = await fetch(this.url,options)
            if(!res.ok) return{data: res, err: true};
            const data = await res.json();
            return{data: data, err: false};
            
        }
        catch(err){
            return {data: err, err: true};
        }
    }
    
}