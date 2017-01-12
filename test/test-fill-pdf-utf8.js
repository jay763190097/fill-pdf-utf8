/**
 * Created by jay on 2017-01-12.
 */
const index = require('../index');

index.generatePdf({name:'张三',age:24},'./test/test.pdf','need_appearances','./test/result.pdf',function (error, stdout, stderr) {
    if(error){
        throw error;
    }
    console.log(stdout);
});