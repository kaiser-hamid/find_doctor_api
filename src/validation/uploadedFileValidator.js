module.exports = (req, field, rules) => {
    const rulesArray = rules.split(/\s*\|\s*/);

    //required
    if(rulesArray.includes("required")){
        if(!req.files || !req.files[field]){
            throw new Error(`The ${field} file is required`);
        }
    }

    //File type
    if(req.files && req.files[field]){
        const mimesElement = rulesArray.find((item) => item.includes("mimes"));
        if(mimesElement){
            const mimesValue = mimesElement.split(":")[1];
            const mimesArray = mimesValue.split(/\s*,\s*/);
            for(const file of req.files[field]){
                if(!mimesArray.includes(file.mimetype)){
                    const mimes = mimesArray.map(item => item.split("/")[1]);
                    let mimesStr = mimes.join(", ");
                    mimesStr = mimesStr.trimEnd(", ")
                    throw new Error(`The ${field} file only allows ${mimesStr}`);
                }
            }
        }
    }

    //max size
    if(req.files && req.files[field]){
        const maxElement = rulesArray.find((item) => item.includes("max"));
        if(maxElement){
            const maxValue = maxElement.split(/\s*:\s*/)[1];
            for(const file of req.files[field]){
                if(file.size  > (maxValue*1024)){
                    throw new Error(`The ${field} file must not exceed the limit of ${maxValue}`);
                }
            }
        }
    }
    return true;
}