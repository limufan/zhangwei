import request from "superagent"

class Api {
    getAutoCompleteItems = (keyword, callback) =>{
        request.get('api/gongyingshang/getAutoCompleteList')
            .query({name: keyword})
            .then(response =>{
                var result = response.body;
                var gongyingshangItems = result.gongyingshangList.map(p => {
                        return p.name
                    });
                callback(gongyingshangItems);
            })
            .catch(result =>{
                alert(result.message);
            })
    }
}

export default new Api()