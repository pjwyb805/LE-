// const autoprefixer = require('autoprefixer')
// const pxtorem = require('postcss-pxtorem')
// // const pxtorem = require('vant')

// module.exports = ({ file }) => {
//   let rootValue
//   // vant 37.5 [link](https://github.com/youzan/vant/issues/1181)
//   if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
//     rootValue = 37.5
//   } else {
//     rootValue = 75
//   }
//   return {
//     plugins: [
//       autoprefixer(),
//       pxtorem({
//         rootValue: rootValue,
//         propList: ['*'],
//         minPixelValue: 2
//       })
//     ]
//   }
// }