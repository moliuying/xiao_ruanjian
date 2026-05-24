let moment = require('moment')
// JAN 03 11:30
// console.log(moment('Feb03 11:30').format('MM-DD HH:mm'))


// let time1 = '2023-01-05T00:00:00+08:00'
// let time2 = '2023-01-05T11:00:00+08:00'
// let time3 = '2023-01-07T00:00:00+08:00'
// console.log(moment(time1).format('MM-DD HH:mm'))
// console.log(moment(time2).format('MM-DD HH:mm'))
// console.log(moment(time3).format('MM-DD HH:mm'))


// console.log(   )
//01-10



// let M = item.innerText.split('. ')[0]
// let D = item.innerText.split('. ')[1]
// let titleTime = moment((M+D)).format('MM-DD')
// if(titleTime ===  moment(this.time).format('MM-DD')){
//     console.log("titleTime",titleTime)
// }


var checkTimes = ['JAN. 09', 'JAN. 10', 'JAN. 11', 'JAN. 12', 'JAN. 13', 'JAN. 16', 'JAN. 17']

let chooseIndex = null
let timer = '01-11'
checkTimes.forEach((item,index)=>{
    let M = item.split('. ')[0]
    let D = item.split('. ')[1]
    let titleTime = moment((M+D)).format('MM-DD')
    if(titleTime ===  moment(timer).format('MM-DD')){
        console.log("titleTime",titleTime)
        console.log(index)
        chooseIndex = index
    }
})
console.log(chooseIndex)
// https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbEDI2de&formGroupId=1535386&appointmentType=Short%20stay%20Schengen%20visas
//"https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbEDI2de&formGroupId=1535386&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days"
// // fetch("https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbLON2de&formGroupId=1526990&timeslot=2023-01-05%2008:30&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days&lang=en-us", {
// //     "headers": {
// //         "accept": "application/json, text/plain, */*",
// //         "accept-language": "zh-CN,zh;q=0.9",
// //         "content-type": "application/x-www-form-urlencoded",
// //         "recaptcha-token": "03AIIukzjpIXCEsVgYF0hu_q6S0H8chFkLfX2pvK8hjziuhsCxKvd6ELghTUgK6UO7OxQxE1fEMdU6R-CEXWfaqfl1TwlF8z6dnaHgVk2CovTAtfpkv9AsSRMHjgCzLXv3J4NXMv4p89pSKaDqgriMPfMW69d1kwZv_nO4qLxFcTBQQeZKqD7nOXYH42eHfSUzLoNlWjTzzp6_nyUicVxEvUoT6JQde9vYvpnhfkBVzSgAD4jB6yi87ZFkLAznbEXoegWf_w9NohPp0Y3EezQZx2AVP4uw8b-oO5Te8-7ru_hewiGtJJCAX2pS9DMpYJgMjLN38Iw4ka5VBaDN464Kr_q93St8lRhPpyNMMkKtbwpcAVMnvTNjxMaweb0dD832TvayOnR4yQ5iciOOmgLQjuRoq2gjtl19PWBNmSD4aF7_FSSnhNlBLA61dzvRRyLMdJrjaVorGvywS9MfeiYHiGLkxBLLgY9yTbRxSPJmKVRO80gnlc0M6XXm-YQK5U-CsDuuYNoKKvbiY3JmyshGXH26t-mRGqs9RA",
// //         "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
// //         "sec-ch-ua-mobile": "?0",
// //         "sec-ch-ua-platform": "\"macOS\"",
// //         "sec-fetch-dest": "empty",
// //         "sec-fetch-mode": "cors",
// //         "sec-fetch-site": "same-origin",
// //         "x-xsrf-token": "d6b2dd13-7f07-4e4f-8c57-295d117700df"
// //     },
// //     "referrer": "https://visas-de.tlscontact.com/appointment/gb/gbLON2de/1526990",
// //     "referrerPolicy": "strict-origin-when-cross-origin",
// //     "body": null,
// //     "method": "POST",
// //     "mode": "cors",
// //     "credentials": "include"
// // });
// //
// //https://translate.googleapis.com/translate_a/t?anno=3&client=te_lib&format=html&v=1.0&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw&logld=vTE_20221023&sl=en&tl=zh-CN&tc=1&dom=1&sr=1&tk=833288.763451&mode=1
// //https://translate.googleapis.com/translate_a/t?anno=3&client=te_lib&format=html&v=1.0&key=AIzaSyBOti4mM-6x9WDnZIjIeyEU21OpBXqWBgw&logld=vTE_20221023&sl=en&tl=zh-CN&tc=1&dom=1&sr=1&tk=357534.157101&mode=1
// fetch("https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbLON2de&formGroupId=1519099&timeslot=2023-02-03%2009:00&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days&lang=en-us", {
//     "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "content-type": "application/x-www-form-urlencoded",
//         "recaptcha-token": "03AIIukzjfF_BUtrKcyGDBAvQvY7VApJHJA_eDyRedB36fTM2v8CG-sTUjmdc7W4FIr-2MZe6uUjdrV-NQrBib3n9gwsSb4gnIzgWj-HIDX7NN659vN20Zyc4xjm7tDhPFmuGk0vOOg6kgPPDqhq5nLKaeIGQUnwfACskMEz_Sk80jxilS2ZAEq0KbSkJDGogi_LIyzXKGtnutkztrEtL4GTPqtBbr9jNyOGWJ2c46_vkrLRhLOcqw-V6ooj4l_nqfiumVNIMkznRSamKHu-jNJtp2tBcAB3O3e-izSfWzmIAa01l6FKd6IyhfXQv2NWRuBohXKtbhFPV2HiC0H3nIqMnkNKf0HW1xwlArZMFsw-5ldBSPKCYDE02YRWqJxNAds6orCQNo9r1rYVweGv_WjtCo47oUUSwIArjc06uFvkT-DFqo212nFppCUxzuIrRN9KcC9ZpUo-9VJBbX46-4tCrY0UXZ0urrVDKiTH_fHcPtnzeCZSNGzieU1wc2sF2-1Z0d7qvw5k1_9dZ9Hr-WegH5B-y56U6giA",
//         "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "x-xsrf-token": "d6b2dd13-7f07-4e4f-8c57-295d117700df"
//     },
//     "referrer": "https://visas-de.tlscontact.com/appointment/gb/gbLON2de/1519099",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });


// QMFEHrVsFe83dkvRY2Bigg7DyS_dRfLjTqS_4j341ZUxb3nS_hJDQoLBscmGejK77aZtsIX0hGWiPbYZV_4RYYu4LElMA7M9UPMgKVNrq_cXGvQW0nHYfLXttgWllOKUqCHqqhOtclQe4GGXgDN0oGI68_IJ3GS9od6c9VGpzww-CImamaQkHNVzdVMTTfS5CruzfWowx5hL2a87wFgbF4KXVhn1lBcKmeyawW-dAtQmeN23J5SkI6vCewkypn7mD1TpHg9wnFPxnJETIexR3buCZJAEOeSXbr__eg==
// 03AIIukzheVpOKyxWP8mun1ofphMfRrFXYacGnRbgO0dq0k-U4iWOm3ZWf3ms31NSJfEu7Ux35w80i1mNrMF6lgHMsJMBR-cD8xDlbRoizH9On00vxSTDhZ6crj92pe-igWpC-ZZZq4KE9JCM3d45702aQudenfkN4p0b7e-GhH2Zb7wz0AlXzSwSRaxsZr2PULo1YrrBZ4em0_A64Xo5patlm_D4POnMuCcw0NXQSC0lQ7O3q2bncjELjgLbZTus_Bh8M3sttnSlpPKMQ8o9a9F9PFWCYXPx2-5kjaywmHWlKllpKwz1qmSVht2_cDhrR6NoYRHs7wuCdzNag4XJ2GkYIRzReioPehoMswX-J7vBaRR0reeqXw8E4-40U6rAA_X8vQEi-m2b2eYQief1GPmHhW52iI26fiWevMhk_1JA7ArOzC7iMkz-EaTJ1FpGHc-0sTMstIsR1bW4B486MbVS8EBdOM3IUySS_gazB3LaRYBeM9c4dhRRZggPOJb4MIsSqkI5R2_ySpFZ4DrsZkYCGohq4_U5XuyVFhSTH1DVinHvIyt5IjH33Vcp5HLlOUiCd031ODOw99rMX-nJi2JjtOIfq6-FJu8wpss-d5NOlDTv9MAYUmuk8ZFtUuVKck7rdIHszX6QJ23NQhsOX1Ie4BCTyph26d8kzfSnSUNA8cAToXOpyqvvnMkm91DMZIc60Z3PSFH4W6Dcqcl0I1npu5cpQEmoLI81FL3pH9YfAlm9eJhEL6SB1Zsu3zPyKyuyfje3ZTNGVXGsgaaJqgxRcDLfYVbGVtqH_RPUrPJb1gbRas3XPT-O4OwLrhAsEpubeXcQhjc7xzZM0TfljY9Czb92mRxxxmDZw8UesRhdXAYuBDG9VgJ8lwQGV9GDkaAr3CgVvB9XwYba9xRSYBjzy2Fh23abPp0jfD3PhS3Z3Zw0Dbdcjw6_SiTG4iU7cT9VI9qPLMPZWtBFxybw26mmySVBRaxVTgNbRy0rZbgnpR3SEEGX5Nen54UJRn9wnf2LTPJb_oZX_zby-zMChDGSdfrmqyvCm2iR2ZagXovtvUKy3XaqMFW57JCa06ay0c62QSB7pgvx8BzO_d3RVeC856Mn-N-6PPHXp-DS6eotio-wbT6VqThzTC0hE-kMGoM4LgeDpl3GMdfTp4Bfcb9doetuRlBy1ecytrw8lVXl28xL3d0HFNtAoW5FZOduslql1a-5s5gJ_ogJMxZq6zswEmjAlb3mI71F3xtcoKu1-I4-Y4BmklBAatmM_68dSTWwk6JnoL4hz-aUXC0paG9Qqx6vP8pBmzlsOQAGDaqp7Jw1_k6WOsPH7BbIaK79Q93-JGhLBIH5BFJHjadfgkS6l0qvrECTcmDL7HmBOsOV6opLjDacfAjIQSHs7VYEk88HPpuJKd3q10H6AWLwgTo21EMX4ETs2Rr94N7bxuvWZpNOZS38Mwbys13QSOOKZW1yG2-Dca0lsXJ8b63HuwNCAq0uQiP2pGg
// 4181f92c-940a-488d-9743-c8ed9da3c86b



// fetch("https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbLON2de&formGroupId=1519099&timeslot=2023-01-04%2008:30&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days&lang=en-us", {
//     "headers": {
//         "accept": "application/json, text/plain, */*",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "content-type": "application/x-www-form-urlencoded",
//         "recaptcha-token": '03AIIukzhGwnPGYMOlnIhI6xIk27VwLwAOTS3cJZl0A5Xfonl6jW4JY8ON7j-FS02dnSBi05o4f2KLCExc8uoBRNJa5dUWuuxNV_5KWsdQRzYy8NT38cyRucntM9rdFXn-WtYCXcrF3AoUseBZMagAQFfzTSrKS2xbzg7wxQhy_gBsyvZNtilXRGWwl25sB58z-O2IIAGkti0F9MIk3tHuotvo5rM0YwLjfJzBGFDK0EEvxiY_MWIm17V3oIpvBUCCN-9La7FDR-C_Gx7P9QlXf0uFk654gXEY_8rIUpvmpxe6KcbRUCMHP8KCAqMunQvPF9mUOQdmJSf8q8QxjSiMJCOyUcL110p65WzAvdllXwLpmkOn6ZWfaQgEng_150POir9JYu_9HwtMUTHbdZkF56cO4OY841zduEqZ81gsK4IQ-CM_nQLy3NUsG9FXlzuWrsnyI4wrBar0MIsVEYkry5c6YM0G_Tl-aQPhzwTkM0A6YrttnUcGj-CGkVEFO-wCnBGYMwdaP7ks4kVajNDi5RPgaeatAXHb-RRq6-eWZRJdMtuEV4IRsbwTikFeerPEx5Qa3k2iWREmuw5HllkvvLpc9iDj3HzSea40NRz4lyG1gXMloB21F9i6ZI3kzb4FApQV0FsLw7CDgyVmOOwmHYJ_6p0GDT0E_SAfXuepndrULsFDgxDtHSsEY47kzPpyy0aAAE6YCmm1cffqOBKX64oJ8dw5VjVAO1nVSpgQWkaD7KtRj9KRx6-AmfXZzFs0yKEx6S56_8ZpZ6jLkD5EkRmn2oimJfRVS8iU6GyM1yNBkDIvY3gD-6InBot6ZOqD-CBG2UJGRUm8Y5-Q3pZ31fipwLdio2_WYalqvrIv7E2npzBEyGpv9FcQ2HPKpz8ydOqBZ5o8Xl37kgG7Y9Nd3a1T7mTMZ9Kz9cuYrsiY5yRn3-dc95NMzhs6c2QfMBrQFo9WZfxksbaJePLkQh8frJggivf0qXG3HpSkvLuLb-EdeW1ZK3ena6--Iim8UFRX3UhQkjcML3kssZb-FIR7XoBS0r5vlEHpN-nchtpBlPBaZF1Kzr_QDeG0uyRA7AThFEhpfM0i6ma0nYU80MQPUmAhaazoDeZGZPU7QHatp_IEeYe2a6280PHNFmjQ7mvw_wnUNR8mdEzXOWTOSkjnZFX-M0K6zEk4xDB85xRXZarnWepRrahPjDEjd8jLbUAkRRNui1AHqN3tH_vG5RXTYlwVvsAWz9wCenaPLZ5HeooXZYzIHKmUq4rkYqWNvLr-i1gSCq95iFObsPZfaEt22MMqWzMAZVsRR8FG_j3JhII9AQcfyeEUH0xWl-kBmlqGMlZAm7pcZomURB0qqBqbgluS5GcD6Ap6hu8ZRE_CyM4aH_HB35I4SgNgPneIchBaJwkQq9riVNhywW7iDGXRSd_zBuQ19RfzjhqhapraM-jXycDMlh2KvAPCfagnbWYhL5h35LUZs6qJ_1XSe0-JwPf_fWa0BBymTw',
//         "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         // "x-xsrf-token": "b4818d13-b60d-4b9d-9f3a-3a6e7e63b656"
//     },
//     "referrer": "https://visas-de.tlscontact.com/appointment/gb/gbLON2de/1519099",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": null,
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });
//
//
// fetch("https://recaptcha.net/recaptcha/api2/reload?k=6LevDoQeAAAAAEVrXcQsTo2zjgSO5oQs-PGf6ZW7", {
//     "headers": {
//         "accept": "*/*",
//         "accept-language": "zh-CN,zh;q=0.9",
//         "content-type": "application/x-protobuffer",
//         "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin"
//     },
//     "referrer": "https://recaptcha.net/recaptcha/api2/anchor?ar=2&k=6LevDoQeAAAAAEVrXcQsTo2zjgSO5oQs-PGf6ZW7&co=aHR0cHM6Ly92aXNhcy1kZS50bHNjb250YWN0LmNvbTo0NDM.&hl=zh-CN&v=Ixi5IiChXmIG6rRkjUa1qXHT&size=invisible&cb=r8575dsea77j",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "\n\u0018Ixi5IiChXmIG6rRkjUa1qXHT\u0012ä\u000b03AIIukzheVpOKyxWP8mun1ofphMfRrFXYacGnRbgO0dq0k-U4iWOm3ZWf3ms31NSJfEu7Ux35w80i1mNrMF6lgHMsJMBR-cD8xDlbRoizH9On00vxSTDhZ6crj92pe-igWpC-ZZZq4KE9JCM3d45702aQudenfkN4p0b7e-GhH2Zb7wz0AlXzSwSRaxsZr2PULo1YrrBZ4em0_A64Xo5patlm_D4POnMuCcw0NXQSC0lQ7O3q2bncjELjgLbZTus_Bh8M3sttnSlpPKMQ8o9a9F9PFWCYXPx2-5kjaywmHWlKllpKwz1qmSVht2_cDhrR6NoYRHs7wuCdzNag4XJ2GkYIRzReioPehoMswX-J7vBaRR0reeqXw8E4-40U6rAA_X8vQEi-m2b2eYQief1GPmHhW52iI26fiWevMhk_1JA7ArOzC7iMkz-EaTJ1FpGHc-0sTMstIsR1bW4B486MbVS8EBdOM3IUySS_gazB3LaRYBeM9c4dhRRZggPOJb4MIsSqkI5R2_ySpFZ4DrsZkYCGohq4_U5XuyVFhSTH1DVinHvIyt5IjH33Vcp5HLlOUiCd031ODOw99rMX-nJi2JjtOIfq6-FJu8wpss-d5NOlDTv9MAYUmuk8ZFtUuVKck7rdIHszX6QJ23NQhsOX1Ie4BCTyph26d8kzfSnSUNA8cAToXOpyqvvnMkm91DMZIc60Z3PSFH4W6Dcqcl0I1npu5cpQEmoLI81FL3pH9YfAlm9eJhEL6SB1Zsu3zPyKyuyfje3ZTNGVXGsgaaJqgxRcDLfYVbGVtqH_RPUrPJb1gbRas3XPT-O4OwLrhAsEpubeXcQhjc7xzZM0TfljY9Czb92mRxxxmDZw8UesRhdXAYuBDG9VgJ8lwQGV9GDkaAr3CgVvB9XwYba9xRSYBjzy2Fh23abPp0jfD3PhS3Z3Zw0Dbdcjw6_SiTG4iU7cT9VI9qPLMPZWtBFxybw26mmySVBRaxVTgNbRy0rZbgnpR3SEEGX5Nen54UJRn9wnf2LTPJb_oZX_zby-zMChDGSdfrmqyvCm2iR2ZagXovtvUKy3XaqMFW57JCa06ay0c62QSB7pgvx8BzO_d3RVeC856Mn-N-6PPHXp-DS6eotio-wbT6VqThzTC0hE-kMGoM4LgeDpl3GMdfTp4Bfcb9doetuRlBy1ecytrw8lVXl28xL3d0HFNtAoW5FZOduslql1a-5s5gJ_ogJMxZq6zswEmjAlb3mI71F3xtcoKu1-I4-Y4BmklBAatmM_68dSTWwk6JnoL4hz-aUXC0paG9Qqx6vP8pBmzlsOQAGDaqp7Jw1_k6WOsPH7BbIaK79Q93-JGhLBIH5BFJHjadfgkS6l0qvrECTcmDL7HmBOsOV6opLjDacfAjIQSHs7VYEk88HPpuJKd3q10H6AWLwgTo21EMX4ETs2Rr94N7bxuvWZpNOZS38Mwbys13QSOOKZW1yG2-Dca0lsXJ8b63HuwNCAq0uQiP2pGg\u001a\n[60,82,98]\"\n!kpSglJEKAAQeFvPobQEHDwJih2ZL6HW4H59J1h-sXlvY-63ijAoOc9-fIw9lsOCrWzavX3avDyzPI55unuY70vAQ7CUwbV38UnFi0zjQtWYvdi8RnQ3IfjD9ZoO2A66l-xIN2ck7MqbEypLNNV2NnKHgxE5O80xaGcuCCNP8gGdH2P0_8m0H4Psf7_hgyOSwxREVzSrOYMqScaLkUvTmSIIDQ7BabQto0hzvew7A0y60TDZVZHL9EPF0R1TFB5q3jNGYnknqQj07zbD6rdadHZ0CJ9cZlOCbSvEzqheSxJhLDlaV9ny7lcWc_ZruLd08gVSMYdyssJrb4t4dTTBIWaO2yumepM2HDj3Lv54r6dGRmgW1DOZkkg7iNNYJgvuvelruoL1NZ_5Jabme93XAf2oBacDImwbKlcq7IUSwkx6X0x-zNZCTIvKTf9kGFJ8MRwfCxCw01xkJsQGRLBxGtONGPlrjtNN8DmvKv0OEFL39suDJmXdIQUNCCXyVgvvw5CbEoek4F6RAEXzjtNkjWF-qb2GREPGTdSgocmbuSae9p-qOEBcb23yHSUwjPu91Zi_r1x03YyRcy26qqkpgSLzXcYUdT91dCNF6QH2CQizKxGZ9Zu79di_2cFmx62vCiHW-oUQ9N6S5k_iehnMPPciVMQUjQlU4uPNEV9hOPvNPU70p7pL4uJL66pF_X6ofcFGkOc8wfoJh-3aZauRepbzb-jW_cW8iTqAPNmURe5gJdF1TuwTtL_3a1D6274GbIh1ACjyvNYeLyhPCGKjlgvA6tZtKYzKdvpSEzBbg8F6K-ssvn-_GpwYsrIBm89AtUa1JU5wBVKjQopTvChSowGiwQpJx1xwZAUMJXlGfTES7HxHCBKXKawxlJbquQlhNnckD2KBvQygEyx0wDXcZqIE6WV1as46-jukuuSQvVwb1noFuq6VJmN--5ThQD9Qc3JlUT5NO7O35GApo41qhPVJSEX1zgC0p9V2iBGV16nk8HcK5DxlWAUbAhWuVoT6WZIoxP-IgYE750yRKsVpOP7Ng6uMce2-tTfDvLKq9HEJv4KI_eT3zBOK9mr03akJHS6VRxzFuosTdfLRuZgCJ7Xc4697VSeZ-ZP-054jsCrrjvtILjh0mzVd7AbC5g25pfX6uzVmL2NU2UII2QJrmM3KC38Z7q-5bMTAWCYkTrHtH71y1J06i7pu6BQP4Bn_IKya7qmxsDJTx5uhD2xGO3KvuuXALTc4LV0mJz80nUrMpkOyWVtJzJSnkuh95sxMkaVTEn2k1Cg0m-tI*\n-529450067\u0001¿\u001f0IqSVek8ty-vQpYMhQSb72XeXfFEvzaGWnUtc99_Dm7ugdVPxEfbLqUdnTCH_nb2id1XzE_jNq0lpTiMBn7-keVf1FfrPrUtrUCUDocGme1n3BKnHiJtGPjXOqYqKR0QOGPaelZBkMzfM0qiLaV0a4-y5f2tZS_gSzKeON1D94LmNln5pUyX3yo-Gb10FFAmzu4J-IgDDq8uwhWMBIQbbuVd3XDEPrc2yh2UDIwjdu1l5XjMRr8-0iWcFJQrfvVtoDSsV_cqxYT9TCfnhxntjLvwQy9K6b0hUK8m_mYtiOzncAMuYbGJS_tDkh4x-WhYk8LebeWtNA-K0iY9aICD79M-jcz1GCemtpJxwJgAD8aCcdEkrGQfjjZA7Iwbqx6B5XEIf-gCtul99XAkvCL-jZS0V-tq4lGtONBHr8p-sUW9CNt3r06t5MR0b8OyiqDEZ_uG6nW9SOBXw9qOwVXNINM21mHtWNAvu1LGKkj9M8Q_e0IBtZyMU09CvhVZGMuABjXVaPRPzy66UcUlS_wyxz4xibgfv0rWNbEUoDuvCzHmGK0n7GqOLblIxC-HEqodeaBUix-WXd189SDDLvKJ0U1ga7Mq1Y0swDvLKoYRqRx0o1eKHpZI4LjH_6a2IXkUgDty5uY1VEDcT0rGYNR0C38Obc1Y8GPf6p7RZdzUj6ATMmpVWSTrtrdKwOSEE58Oed1pAHPz-q7hde0gtDLObgGE5F_HUupZ1eCUy1_XkoE83Gv3YuY1wVjIPFMHOc5FlLOvTtpt5WCkM8s6psF1qDy0D7odvVDcN7cWojmpFTPkGq8mfm1RONOG-h2eMPkUn0J7Acjo7DL-nim1OKQbkw6J7XzEU-tizuGVyFzUD1rZ-o14uDgXDpp9MOUUX3sBvVzwf9dWtkHZSLjThAea7mTdE6QfFk6eVRRwr6teDhGNPNu3thW1SNBDyw6aMaj9K9wSpx4h4Yv_nzK-FZT0gBuK8xHF-I0EKzvHQl0VdNwbyzItuOyMs9s-vfVwkCRzcsJ6PUCo5B-DUhVhDG_7Bw5-NUDMtDfbHjUprP_vT4ZykQlQY9_nRloJHSvvk6IOQT007CP3QpnNCKwL27IKbPy8cC7jRsHVIDSDYwZeDdUAMy7OYdFUyDu7JsIdfSigGCLXCZ4VDVt_HrIhoSB0A5sKcpFFxVisJp7RZdz8-9MCxwEkxGfnUtJJsSikG3cilgoYzQOUDyK-raSsc5NO8oXCAPij9x6i3ZkAjLcTco5hCS0Af1bmLclFN7v7jgXFTZC8P7s6ljFwcLOm_uqGENAQX79iqkiwhEc7tq6KCUTD-u-CfkjFZFe3szIJmawgn8pqba3JRFu7BwY5tOEDy5K64mEkwOALOlJyPO0v--eV4n1Qv-xDwoKhtXCgbx6a_jWIzCNfxl7GCciQL-OGom1BiHujsu41hRVL4-NS8Zzo4CtvPmLRyTDPvzt-7hGFYJNvQzryOVjAACcy9in1XOBfNvr9odCvz8uygoYpBGf7SvLhyVRYV4PJ7Y0YoCui_n3tdPRTt2LWQlkNQ9RMEn6VbfhI3-sSOfYs9FxfDu5BxfCoyDrqVpH5yJBwKs5BeRDI86tqik3xaCRv3zMmFh00g4NS7do5wRCTl7cphZlUwH-m4popsSQAQqYp5Q0b--sucnHx6NxMKqpqbez4bF8yte3I1TQzp1HtjRiYC4r-gels2Gu3Xr4uWQ1D1E9S6vkszFvnRsIlsUi8LEL3Kb41xTufPspVzSyUI7sulrFl5XjMRr7xhf1MoAOPJvGRcOED-06WXlnAzCOGrualRPB___t2TiFRRBN2suH9SIzcDy7SZbDJX9fLlzp9XWkcR4t6YfVspCBXHoJ9cRzonBbeMdT0wAhKwp4-HZCvy5OWPlDwSDBvEx6FKZw0L1L6jjYI9Jufx02qBQ0sF18nDkG8hDA_IlImBPgroBuyUfm9DERfkz5eYXx7uCrufdFVYI_vVtJFUSE8T3qujfIgjQPfNnKZvR1cg5KmPgVVCJPnYv5yPZ1gW_8TQZ408P_jZw4pcPTAXFuevoEtfQCvE0J-SfxIM1PfBj4NqIRcLo7eDTxkn5dSsp4gmIC3WpJh8cVf8Cenbh4ZSR-_bwKmmgEMK_PnGsZMyLzPgw590XSMj7_6Sr3R5RvDa67l4iEQ3A8_XvnNoU-rozpBtYEdH_di9fFtPMjMAwsyGdzZII7q3nJ5LLxcPqshqjzc2H8PgjqB7HQ_n94qPgm82GL7AxXdPYBvv19OeX2JPBPm0x4xfUPcY6ae2az4KL_TWu3U6QxEh3rqvl2EQA-7Ll4VUMy4Z_MewUjBBAdzvrZh_JjbwtrCZiHFT9fPIoW1jYSUX7tN8iWo7MwDgxWhpJzjk8cOKnU4wFdS1wWtdQBjiB6WxkHteBfXTxpSOSQsM_M62jlFfJuazsaBnP0ft4Me-oHhj-_Hpy4SVUyoMCLmUpzo3E_21p7ZxYEEB4KK5c19WIhbcmXhkMEgEEM3PmXpmQO4A26hsSSjq3-KHhFdd__nu1790V1o3_MSMr2U_IPnFrsJ0bzcs1_Coi1g7FxzD146jTTUb6cmKb4crJAP5v7Z7eFP7-uqvpoFBSSDcosmWLRX427WVa04rCRTBznORWkAa9ei0mXNhHNvDqIthQRn84r6XoE1a_x34zJ2gdDAhIN_dsYVYVwXP3MN3YD08A_uxjZ1WRCbp4qyLgV0z8Nvkop55KhDR8M6KgC1NCuTCwGpLVTzlsbFvakwF9ObDwaVdFz0NxKaLX0EY5eC-xnJMNA0Mx6JyZysqDOPCwIdbHiDo9suTUS5Q7wS7w4tmOhTs_re8WHRV7s3vyXVHWhPbyrasmFJG9NLMrIV7RT3397mfiUcpNhHlpZ-JQRICwbKWoD1FFAa_xWaORiAF0qKbdn4m_AXAf2dKLQfrvaCGYjlE8f6jwXZfaUEh1NSun0wL89a1l3RULwrrxad9aEUhJtPghaNodELbw6aKZkYZ_OK-laBNWv8d5eTBhXQhJBzdnoZsTUz_EdyHjkxAQR-9wotbdysKz-y8qYRnMwbT069ZSBkNCd-SnV4uShTiun-NWzYqFNSwbn1IQifgoaRhbCjnz7KWdU8lCO7JqqxZZgspDfGklG9oUfnmyLJ4XkJBGbq4m2ZBQhIQvsiHhjY187nJrWpPLhER6ZpjVmUS3sqJcVQ3EvDHqpBrTE77CK3LoXxNESALvc-AVjs65PjfeXI4JxP2zqujOSEE6MGmd1pAG_z-q7hde05C5PXaxE01GvvTtItuVC8PEr-khF89H_rWr7xhf0RIEAump6N1ShAPztmaeGf95ciqimI7HgTfv8JvfCEgCO3BxZZ7QTYM3ay9iG85MPzQsHI1HQfewKF7VTsS69azj5RBTvMR09-LkFdOI-PEyKd8QRf-5cWcWX4yKhjWtoGIbyL3_NOff01MEhrK14uSGwPmyaWAWTwi_drgjZo_XR_4572Vm4QdESDPxJBjVyER7cPAimZlMvbZpndnQTIP5czBpzMb_uG7mHFUOhXy-KWyV3U7JAL3vMFyaiUDBayge1o5JBfwtZJfdSYQDLGMj2ZlQQDgzqp8ODIxGsHJfEw4RevjxJmWWlM51dCuoIA7GAPZwLl1US0YE8y6k4RiMPjq5J-ZRTUfIdvHlXBrQAAFzqCTUzMb67i6jXVUVQ_wyoWnWzEbA9q9nlVWIQrIqZ5lWCMy3cCtnFV8LxC_p4xpTCn96MbIdYInRTAHvqB8YlYb9tfFfYJKNBbuzK6SiWAlDPLgvpdhLg3nytOWYkFCBtqzu15QC_PWuJd4SSwS7cXQfYovTRfztc-3kWEjBgPKi3d7YR72y6eoUkNBE-bjqqxWHyLc17mfd081FurHrZw1HQDku5pzVjwW9_qntJJwFRge_NK1jCUmKRHsyJ45IfXiv6RthjNA5eTnz6qGYEogs5tvXDke5wCtul9paEvy1LCRn2xXK8evg3FRHTYUwdmym4BQ9cnyxKRuUP0Ww9Cwjg2\u0001q:î\u000105ABhfS3FjTt-ALTZFsvReWnY3pAx1FAfvgb-pTSIIc7R9JgX5HtMx3qjOmVwP4z2WF1izvkArmEE4bC2WrMTjQJZN32jzbMfCBr3vkPsn3RrlKq5wBgqMgS0W2wu6s7Y9lksGz_HgxJ-_jtF_Z4GbW1TnyOaWVnAPWtCyGMOuIFXfiFAUpX-dsk7lnU2wPrT6ICo2h5bAQgK3pMLSV2P5bI0dlZ1tPhg7JOxQkqBkHjnyB\u0004bookr(6LevDoQeAAAAAEVrXcQsTo2zjgSO5oQs-PGf6ZW7",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
// });
//
//
// window.parent.postMessage({a: document.querySelectorAll('iframe')[2].contentWindow.document.querySelector("#recaptcha-token").value }, '*')
// addEventListener('message', e => {
//     // e.data为子页面发送的数据
//     console.log(123)
//     console.log(e.data.a)
// })
//
//
// addEventListener('message', event => {
//     // IMPORTANT: check the origin of the data!
//     console.log(event,'----')
// });
// const frame = document.querySelectorAll('iframe')[2];
// frame.contentWindow.postMessage({a: document.querySelectorAll('iframe')[2].contentWindow.document.querySelector("#recaptcha-token").value}, '*');
//
//
//
// document.querySelectorAll('iframe')[2].contentWindow.document.querySelector("#recaptcha-token").value



//
// document.querySelectorAll('.-available')[1].click()
// setTimeout(()=>{
//     document.querySelectorAll('.-uppercase')[1].click()
// },1000)



//
// function  getdata (){
//     return  new Promise(async (resolve, reject)=>{
//         fetch("https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbLON2de&formGroupId=1526990&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days", {
//             "headers": {
//                 "accept": "application/json, text/plain, */*",
//                 "accept-language": "zh-CN,zh;q=0.9",
//                 "sec-ch-ua": "Chromium;v=106, Google Chrome;v=106, Not;A=Brand;v=99",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-platform": "macOS",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "same-origin",
//                 "x-xsrf-token": "e5ad37bc-f15b-4298-91c5-b8b9b0d990c1"
//             },
//             "referrer": "https://visas-de.tlscontact.com/appointment/gb/gbLON2de/1526990",
//             "referrerPolicy": "strict-origin-when-cross-origin",
//             "body": null,
//             "method": "GET",
//             "mode": "cors",
//             "credentials": "include"
//         }).then( async res=>{
//             let data = await res.text()
//             console.log(data+'___111111111')
//             resolve(data)
//         }).catch(err=>{
//             console.log('err',err)
//             reject(err)
//         })
//     })
// }
// getdata()
//
//
//
//
//
//
// getdata ()
// function getdata (){
//     return  new Promise(async (resolve, reject)=>{
//         fetch("https://visas-de.tlscontact.com/services/customerservice/api/tls/appointment?client=de&issuer=gbLON2de&formGroupId=1526990&appointmentType=Schengen%20Visa%20-%20Less%20than%2090%20days", {
//             "headers": {
//                 "accept": "application/json, text/plain, */*",
//                 "accept-language": "zh-CN,zh;q=0.9",
//                 "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
//                 "sec-ch-ua-mobile": "?0",
//                 "sec-ch-ua-platform": "\"macOS\"",
//                 "sec-fetch-dest": "empty",
//                 "sec-fetch-mode": "cors",
//                 "sec-fetch-site": "same-origin"
//             },
//             "referrer": "https://visas-de.tlscontact.com/appointment/gb/gbLON2de/1526990",
//             "referrerPolicy": "strict-origin-when-cross-origin",
//             "body": null,
//             "method": "GET",
//             "mode": "cors",
//             "credentials": "include"
//         }).then( async res=>{
//             console.log(res)
//             let data = await res.text()
//             console.log(data+'___111111111')
//             if(data){
//                 console.log(123)
//                 // setInterval(()=>{
//                 //     getdata()
//                 // },2000)
//             }
//             resolve(data)
//         }).catch(err=>{
//             console.log('err',err)
//             reject(err)
//         })
//     })
// }
//
//
//
//
// function getCookie(name) {
//     let strCookie = document.cookie;
//     let arrCookie = strCookie.split(';');
//     for(let i = 0; i < arrCookie.length; i++) {
//         let arr = arrCookie[i].split('=');
//         if(arr[0].replace(/(^\s*)|(\s*$)/g, "") == name) {
//             return arr[1];
//         }
//     }
//     return '';
// }
//
// console.log(getCookie('XSRF-TOKEN'))



