import querystring from "querystring";

export default class QueryString{
    static parse(search){
        if(search){
            if(search.startsWith("?")){
                search = search.substr(1, search.length - 1);
            }
            let query = querystring.parse(search);
            return query;
        }

        return null;
    }
}