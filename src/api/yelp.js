import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers:{
        Authorization: 
        'Bearer aIvz0YebP0ULAbRrZbsKwdCfPqAOrhdD4icq97R_jckfp-HxfJlN_h8pd8hcCKLZDjTrU8r04i0IrqFSF1jdxe1S5Xq2hzO3llY3iOJs820zA1juFamoupLtDZAEXnYx'
    }
});

