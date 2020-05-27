import request from "superagent"

class Api {
    getPeijianItems = (keyword, callback) =>{
        request.post('api/peijian/getAutoCompleteList')
            .send({keyword: keyword})
            .then(response =>{
                var result = response.body;
                var peijianItems = result.peijianList.map(p => {
                        return { 
                            value: p.id, 
                            text: `${p.name}-${p.tuhao} (${p.danjia}/${p.danwei}) (${p.kucun})`
                        }
                    });
                callback(peijianItems);
            })
            .catch(result =>{
                alert(result.message);
            })
    }
}

export default new Api()