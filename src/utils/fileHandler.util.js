const multer = require("multer");
const fs = require("fs");
const path = require("path");
const util = require("util");
const uploads = multer({dest: "temp/uploads"});

const mkdir = util.promisify(fs.mkdir);
const rename  = util.promisify(fs.rename);
const exists  = util.promisify(fs.exists);

const parseFileExt = (filename) => {
    try{
        if(typeof filename != 'string'){
            return null;
        }
        const nameArray = filename.split(".");
        if(nameArray.length < 1){
            return null;
        }
        nameArray.reverse();
        return nameArray[0];
    }catch (e) {
        console.log(e.message);
        return null;
    }

}
const parseFileName = (file) => {
    let f_name = file.fieldname + "-" + Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = parseFileExt(file.originalname);
    return ext ? `${f_name}.${ext}` : f_name;
}


module.exports.multipartData = (fields) => {
    try{
        if(typeof fields != 'object'){
            return uploads.none();
        }
        const configFields = [];
        for (const item of fields){
            if(typeof item === 'object'){
                const key = Object.keys(item)[0];
                const value = Object.values(item)[0];
                configFields.push({name: key, maxCount: value});
                continue;
            }
            configFields.push({name: item, maxCount: 1});
        }
        return uploads.fields(configFields);
    }catch (e) {
        console.log(e.message);
        return uploads.none();
    }
}

module.exports.moveUploadedFile = async (file, dest = "public/uploads") => {
    try{
        //create folder if not exists
        const destinationForlerExists = await exists(dest);
        if(!destinationForlerExists){
            await mkdir(dest, {recursive: true});
        }
        const f_name = parseFileName(file);
        const newFilePath = path.join(dest, f_name);

        //move file
        await rename(file.path, newFilePath);

        //Convert localpath to urlpath
        let urlPath = newFilePath.replace(/\\/g, '/');
        urlPath = urlPath.replace(/public\//, '');
        return urlPath;
    }catch (e) {
        console.log(e.message);
        return null;
    }
}

module.exports.removeTempUploadedUnusedFiles = (req) => {
    for(const key in  req.files){
        for(const file of req.files[key]){
            fs.unlink(file.path, (err) => {
                console.log("Temp file remove error", err);
            });
        }
    }
}