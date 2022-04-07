const convert = require('xml-js');
const request = require('request');
const { sequelize } = require('./models');
const db = require("./models");
const Policy = db.Policy;
const cheerio = require("cheerio");
const axios = require("axios");
const iconv = require("iconv-lite");



sequelize.sync({ force: false }).then(() => {
    console.log("DB Connected Success");
}).catch((err) => {
    console.error(err);
    
});



  let policyId = [];
  
  getapi(1) 

  setTimeout(() => {
    getapi(2)
    setTimeout(() => {
      getapi(3)
      setTimeout(() => {
        getapi(4)
        setTimeout(() => {
          getapi(5) 
          setTimeout(async() => {

              for (let pId of policyId) {
                await page(pId)
              } // for 문

          }, 7000);
        }, 7000);
      }, 7000);
    }, 7000);
  }, 7000);
  
  
 

  function getapi(num) {
  
    const HOST = 'https://www.youthcenter.go.kr/opi/empList.do'
    let requestUrl = `${HOST}?openApiVlak=9bb0c59ee0501fc2e74969a5&pageIndex=${num}&display=100`

    request.get(requestUrl, async (err, res, body)=> {
        if(err) {
            console.log(`err => ${err}`)
        }
        else {
          if(res.statusCode == 200) {

            await abc(body)
            
          }
        }
    }) // request.get


  async function abc(body) {

    const result = body
    const xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
      
    const json = JSON.parse(xmlToJson)
    const sJon = json.empsInfo.emp
    
    let seq = 1

    for (let i of sJon) {

        const district = {
            "003002001001" : "서울,종로구" , "003002001002" : "서울,중구" ,  "003002001003" : "서울,용산구" ,  "003002001004" : "서울,성동구" ,  "003002001005" : "서울,광진구" ,  "003002001006" : "서울,동대문구" ,  "003002001007" : "서울,중랑구" ,  "003002001008" : "서울,성북구" ,  "003002001009" : "서울,강북구" ,  "003002001010" : "서울,도봉구" ,  "003002001011" : "서울,노원구" ,  "003002001012" : "서울,은평구" ,  "003002001013" : "서울,서대문구" ,  "003002001014" : "서울,마포구" ,  "003002001015" : "서울,양천구" ,  "003002001016" : "서울,강서구" ,  "003002001017" : "서울,구로구" ,  "003002001018" : "서울,금천구" ,  "003002001019" : "서울,영등포구" ,  "003002001020" : "서울,동작구" ,  "003002001021" : "서울,관악구" ,  "003002001022" : "서울,서초구" ,  "003002001023" : "서울,강남구" ,  "003002001024" : "서울,송파구" ,  "003002001025" : "서울,강동구" ,
            "003002002001" : "부산,중구","003002002002" : "부산,서구","003002002003" : "부산,동구","003002002004" : "부산,영도구", "003002002005" : "부산,부산진",  "003002002006" : "부산,동래구", "003002002007" : "부산,남구","003002002008" : "부산,북구","003002002009" : "부산,해운대",  "003002002010" : "부산,사하구", "003002002011" : "부산,금정구", "003002002012" : "부산,강서구", "003002002013" : "부산,연제구", "003002002014" : "부산,수영구", "003002002015" : "부산,사상구", "003002002016" : "부산,기장군", 
            "003002003001" : "대구,중구", "003002003002" : "대구,동구", "003002003003" : "대구,서구", "003002003004" : "대구,남구", "003002003005" : "대구,북구", "003002003006" : "대구,수성구",  "003002003007" : "대구,달서구",  "003002003008" : "대구,달성군", 
            "003002004001" : "인천,중구",  "003002004002" : "인천,동구", "003002004003" : "인천,남구",  "003002004004" : "인천,미추홀구",  "003002004005" : "인천,연수구",  "003002004006" : "인천,남동구",  "003002004007" : "인천,부평구",  "003002004008" : "인천,계양구",  "003002004009" : "인천,서구",  "003002004010" : "인천,강화군",  "003002004011" : "인천,옹진군", 
            "003002005001" : "광주,동구", "003002005002" : "광주,서구", "003002005003" : "광주,남구", "003002005004" : "광주,북구", "003002005005" : "광주,광산",  
            "003002006001" : "대전,동구",  "003002006002" : "대전,중구", "003002006003" : "대전,서구",  "003002006004" : "대전,유성구",   "003002006005" : "대전,대덕구",  
            "003002008001" : "경기,수원시",  "003002008002" : "경기,성남시",  "003002008003" : "경기,의정부시",   "003002008004" : "경기,안양시",  "003002008005" : "경기,부천시",  "003002008006" : "경기,광명시",  "003002008007" : "경기,평택시",  "003002008008" : "경기,동두천시",   "003002008009" : "경기,안산시",  "003002008010" : "경기,고양시",  "003002008011" : "경기,과천시",  "003002008012" : "경기,구리시",  "003002008013" : "경기,남양주시",   "003002008014" : "경기,오산시",  "003002008015" : "경기,시흥시",  "003002008016" : "경기,군포시",  "003002008017" : "경기,의왕시",  "003002008018" : "경기,하남시",  "003002008019" : "경기,용인시",  "003002008020" : "경기,파주시",  "003002008021" : "경기,이천시",  "003002008022" : "경기,안성시",  "003002008023" : "경기,김포시",  "003002008024" : "경기,화성시",  "003002008025" : "경기,광주시",  "003002008026" : "경기,양주시",  "003002008027" : "경기,포천시",  "003002008028" : "경기,여주시",  "003002008029" : "경기,양주군",  "003002008030" : "경기,여주군",  "003002008031" : "경기,연천군",  "003002008032" : "경기,포천군",  "003002008033" : "경기,가평군",  "003002008034" : "경기,양평군", 
            "003002007001" : "울산,중구",   "003002007002" : "울산,남구",   "003002007003" : "울산,동구",   "003002007004" : "울산,북구",   "003002007005" : "울산,울주군", 
            "003002009001" : "강원,춘천시",   "003002009002" : "강원,원주시",   "003002009003" : "강원,강릉시",   "003002009004" : "강원,동해시",   "003002009005" : "강원,태백시",   "003002009006" : "강원,속초시",   "003002009007" : "강원,삼척시",   "003002009008" : "강원,홍천군",   "003002009009" : "강원,횡성군",   "003002009010" : "강원,영월군",   "003002009011" : "강원,평창군",   "003002009012" : "강원,정선군",   "003002009013" : "강원,철원군",   "003002009014" : "강원,화천군",   "003002009015" : "강원,양구군",   "003002009016" : "강원,인제군",   "003002009017" : "강원,고성군",   "003002009018" : "강원,양양군",  
            "003002010001" : "충북,청주시",   "003002010002" : "충북,충주시",   "003002010003" : "충북,제천시",   "003002010004" : "충북,청원군",   "003002010005" : "충북,보은군",   "003002010006" : "충북,옥천군",   "003002010007" : "충북,영동군",   "003002010008" : "충북,증평군",   "003002010009" : "충북,진천군",   "003002010010" : "충북,괴산군",   "003002010011" : "충북,음성군",   "003002010012" : "충북,단양군",  
            "003002011001" : "충남,천안시",   "003002011002" : "충남,공주시",   "003002011003" : "충남,보령시",   "003002011004" : "충남,아산시",   "003002011005" : "충남,서산시",   "003002011006" : "충남,논산시",   "003002011007" : "충남,계룡시",   "003002011008" : "충남,당진시",   "003002011009" : "충남,금산군",   "003002011010" : "충남,연기군",   "003002011011" : "충남,부여군",   "003002011012" : "충남,서천군",   "003002011013" : "충남,청양군",   "003002011014" : "충남,홍성군",   "003002011015" : "충남,예산군",   "003002011016" : "충남,태안군",   "003002011017" : "충남,당진군",  
            "003002012001" : "전북,전주시",   "003002012002" : "전북,군산시",   "003002012003" : "전북,익산시",   "003002012004" : "전북,정읍시",   "003002012005" : "전북,남원시",   "003002012006" : "전북,김제시",   "003002012007" : "전북,완주군",   "003002012008" : "전북,진안군",   "003002012009" : "전북,무주군",   "003002012010" : "전북,장수군",   "003002012011" : "전북,임실군",   "003002012012" : "전북,순창군",   "003002012013" : "전북,고창군",   "003002012014" : "전북,부안군",  
            "003002013001" : "전남,목포시",   "003002013002" : "전남,여수시",   "003002013003" : "전남,순천시",   "003002013004" : "전남,나주시",   "003002013005" : "전남,광양시",   "003002013006" : "전남,담양군",   "003002013007" : "전남,곡성군",   "003002013008" : "전남,구례군",   "003002013009" : "전남,고흥군",   "003002013010" : "전남,보성군",   "003002013011" : "전남,화순군",   "003002013012" : "전남,장흥군",   "003002013013" : "전남,강진군",   "003002013014" : "전남,해남군",   "003002013015" : "전남,영암군",   "003002013016" : "전남,무안군",   "003002013017" : "전남,함평군",   "003002013018" : "전남,영광군",   "003002013019" : "전남,장성군",   "003002013020" : "전남,완도군",   "003002013021" : "전남,진도군",   "003002013022" : "전남,신안군",  
            "003002014001" : "경북,포항시",   "003002014002" : "경북,경주시",   "003002014003" : "경북,김천시",   "003002014004" : "경북,안동시",   "003002014005" : "경북,구미시",   "003002014006" : "경북,영주시",   "003002014007" : "경북,영천시",   "003002014008" : "경북,상주시",   "003002014009" : "경북,문경시",   "003002014010" : "경북,경산시",   "003002014011" : "경북,군위군",   "003002014012" : "경북,의성군",   "003002014013" : "경북,청송군",   "003002014014" : "경북,영양군",   "003002014015" : "경북,영덕군",   "003002014016" : "경북,청도군",   "003002014017" : "경북,고령군",   "003002014018" : "경북,성주군",   "003002014019" : "경북,칠곡군",   "003002014020" : "경북,예천군",   "003002014021" : "경북,봉화군",   "003002014022" : "경북,울진군",   "003002014023" : "경북,울릉군",
            "003002015001" : "경남,창원시",   "003002015002" : "경남,마산시",   "003002015003" : "경남,진주시",   "003002015004" : "경남,진해시",   "003002015005" : "경남,통영시",   "003002015006" : "경남,사천시",   "003002015007" : "경남,김해시",   "003002015008" : "경남,밀양시",   "003002015009" : "경남,거제시",   "003002015010" : "경남,양산시",   "003002015011" : "경남,의령군",   "003002015012" : "경남,함안군",   "003002015013" : "경남,창녕군",   "003002015014" : "경남,고성군",   "003002015015" : "경남,남해군",   "003002015016" : "경남,하동군",   "003002015017" : "경남,산청군",   "003002015018" : "경남,함양군",   "003002015019" : "경남,거창군",   "003002015020" : "경남,합천군",  
            "003002016001" : "제주,제주시",  "003002016002" : "제주,서귀포시",  "003002016003" : "제주,북제주군",   "003002016004" : "제주,남제주군",  
            "003002017001" : "세종,세종",  
            "003002001" : "서울,전체", "003002002" : "부산,전체", "003002003" : "대구,전체", "003002004" : "인천,전체", "003002005" : "광주,전체", "003002006" : "대전,전체", "003002007" : "울산,전체", "003002008" : "경기,전체", "003002009" : "강원,전체", "003002010" : "충북,전체", "003002011" : "충남,전체", "003002012" : "전북,전체", "003002013" : "전남,전체", "003002014" : "경북,전체", "003002015" : "경남,전체", "003002016" : "제주,전체", "0030020ㄴ17" : "세종,전체",
          };

        console.log(`\n------------ ${seq} 번째 ----------`)
        console.log('정책번호 : '+i.bizId["_text"])
        const policyNumber = i.bizId["_text"]

        const alreadyHave = await Policy.findOne({
            attributes : [ 'policyNum'],
            where : { policyNum : policyNumber}
        })
        
        if (alreadyHave) {
          continue;
        } else {

        policyId.push(i.bizId["_text"])

        let regionId =  (i.polyBizSecd["_text"])
        let region = ""

        if (district.hasOwnProperty(regionId)) {
            region = district[regionId]
        } else {
            region = "전국"
        }
        console.log('정책명 : '+i.polyBizSjnm["_cdata"])
        console.log('기관 및 지자체 구분 : '+i.polyBizTy["_cdata"])
        console.log('지역 : '+region)
        console.log('정책요약 : '+i.polyItcnCn["_cdata"])
        
        console.log('정책 유형 : '+i.plcyTpNm["_cdata"])
        console.log('지원 내용 : '+i.sporCn["_cdata"])
        console.log('사업 신청 기간 : '+i.rqutPrdCn["_cdata"])
        console.log('지원규모(명) : '+i.sporScvl["_cdata"])

        console.log('요건-연령 : '+i.ageInfo["_cdata"])
        console.log('요건-학력 : '+i.accrRqisCn["_cdata"])
        console.log('요건-전공 : '+i.majrRqisCn["_cdata"])
        console.log('요건-취업상태 : '+i.empmSttsCn["_cdata"])
        console.log('요건-특화분야 : '+i.splzRlmRqisCn["_cdata"])
    
        console.log('신청 절차 : '+i.rqutProcCn["_cdata"])
        console.log('심사 및 발표 : '+i.jdgnPresCn["_cdata"])
        console.log('신청 사이트 : '+i.rqutUrla["_cdata"])
        
        console.log('운영 기관 : '+i.cnsgNmor["_cdata"])
        


        await Policy.create({
            policyNum : i.bizId["_text"], // 정책번호

            title : i.polyBizSjnm["_cdata"], // 정책명
            group: i.polyBizTy["_cdata"], // 기관 및 지자체 구분
            location : region, // 지역
            summary: i.polyItcnCn["_cdata"], // 정책요약
            
            category : i.plcyTpNm["_cdata"], // 정책 유형
            benefit_desc: i.sporCn["_cdata"], // 지원 내용
            apply_period: i.rqutPrdCn["_cdata"], // 사업 신청 기간
            scale : i.sporScvl["_cdata"], // 지원규모(명)

            age : i.ageInfo["_cdata"], // 요건-연령
            education : i.accrRqisCn["_cdata"], // 요건-학력
            major : i.majrRqisCn["_cdata"], // 요건-전공
            job_status : i.empmSttsCn["_cdata"], // 요건-취업상태
            special : i.splzRlmRqisCn["_cdata"], // 요건-특화분야

            process : i.rqutProcCn["_cdata"], // 신청 절차
            dday : i.jdgnPresCn["_cdata"], // 심사 및 발표
            apply_site : i.rqutUrla["_cdata"], // 신청 사이트
            operation : i.cnsgNmor["_cdata"], // 운영 기관
            view : Math.floor((Math.random() * (100 - 30)) + 30), // 조회수
            state : "검토중"
            
          });

        }

        
    }
    seq++
  }

} // function api 



async function page(pageId) {

  await axios({
    url: `https://www.youthcenter.go.kr/youngPlcyUnif/youngPlcyUnifDtl.do?bizId=${pageId}`,
    method: "GET",
    responseType: "arraybuffer",
  }).then((response) => {
      const content = iconv.decode(response.data, "UTF-8").toString();
    

      const $ = cheerio.load(content);
      const bestList = $("#content > div.ply-view-section.green > div.view-txt");
      bestList.each((index, element) => {
        const residence = $(element).find("div:nth-child(4) > ul > li:nth-child(2) > div.list_cont").text().trim();
        const category_tmp = $(element).find("div:nth-child(2) > ul > li:nth-child(1) > div.list_cont").text().trim();
        const do_period = $(element).find("div:nth-child(2) > ul > li:nth-child(3) > div.list_cont").text().trim();
        const plus = $(element).find("div:nth-child(4) > ul > li:nth-child(7) > div.list_cont").text().trim(); 
        const without = $(element).find("div:nth-child(4) > ul > li:nth-child(8) > div.list_cont").text().trim(); 
        const submit = $(element).find("div:nth-child(6) > ul > li:nth-child(4) > div.list_cont").text().trim(); 
        const etc = $(element).find("div:nth-child(8) > ul > li:nth-child(1) > div.list_cont").text().trim(); 
        const maker = $(element).find("div:nth-child(8) > ul > li:nth-child(2) > div.list_cont").text().trim();  
        const reference_site1 = $(element).find("div:nth-child(8) > ul > li:nth-child(4) > div.list_cont").text().trim();  
        const reference_site2 = $(element).find("div:nth-child(8) > ul > li:nth-child(5) > div.list_cont").text().trim();  
        
        Policy.update(
        { category_tmp,
          do_period,
          residence,
          plus, 
          without, 
          submit, 
          etc, 
          maker,
          reference_site1,
          reference_site2, }, 
        {where : {policyNum : pageId} }
        )

      });
  })
    .catch((error) => {
      console.log(error);
  });

    } // page 함수