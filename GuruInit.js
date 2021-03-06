// Initiate Guru user list and their portfolio stocks
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Stocks = require('./db/collections/stocks');
var Stock = require('./db/models/stock');
var Portfolio = require('./db/models/portfolio');
var async = require('async')

var guruInit = function(){
  // new Stock({portfolios_id: 1, symbol: 'stock'}).save();
  var guru_id = 1;
  var portf_id = 1;

  var guruList = ['WarrenBuffet', 'GeorgeSoros', 'BillGates', 'CarlIcahn'];
  var guruStocks = {
    'WarrenBuffet': {
      'stocks':  ['IBM','WFC','PCP','USB','PSX','FOXA','DE','LEE','UPS','KRFT','MDLZ','JNJ','DNOW','MEG','VRSK','GHC','LMCA','SNY','GE','LMCK','QSR','TMK','LBTYK','CBI','SU','COST','MTB','VZ','VRSN','USG','GM','GS','MCO','DTV','DVA','PG','WMT','AXP','KO','MA','V','WBC','LBTYA','VIAB','CHTR','BK','NOV'],
      'shares': [79565115,470292359,4200792,83773390,7499450,6228097,17310090,88863,59400,192666,578000,327100,1825569,4646220,1563434,107575,4000000,3905875,10585502,8000000,8438225,6353727,7346968,10701110,22354294,4333363,5382040,15000928,12985000,39002016,41000000,12631531,24669778,31353468,38565570,52793078,60385293,151610700,400000000,5229756,9885160,3863195,10342793,8265079,5979136,20680420,1978895],
    },
    'GeorgeSoros': {
      'stocks':  ['CY','EBAY','NBL','LEN','CRC','DHI','MSI','PHM','NEE','UAL','CVE','NFX','GLPI','WNR','ENDP','OKE','TPX','LSCC','SU','AGNPRA','AGN','GM','SCTY','FTI','TOL','JDSU','ENTR','PCL','MSCC','DHT','SFS','DTV','KRFT','VXX','CNQ','EXA','RDN','XEC','DK','CXO','ROVI','ENR','SYRG','QIHU','CDNS','W','PKG','DRC','BRCM','KKD','SPY','SFUN','FET','QUNR','PMCS','LOW','QTM','INFA','TDC','NVDA','TXT','MXL','EPAY','VSTO','VRTX','PCP','CBRL','ALJ','TRIP','RDC','JUNO','LNKD','UTX','FCX','BABA','CLDN','DEI','SGNT','KYTH','IPXL','CRTO','MBI','PLCM','BSMX','THRM','AUDC','T','TEO','CALX','TAP','AOSL','MJN','BHI','GSIT','OHI','ONCE','FLKS','ECR','AKRX','CFG','WIX','SUPN','BBG','CRI','CACQ','EDU','KODK.WS.A','KODK.WS','PTBI.WS','NAT','BIOA.WS','ECHO','WFT','AOI','KODK','MGNX','BLCM','TAS','ABEO','INVN','KEG','TWER','VMEM','GSAT','AMAT - CALL','EXXI','AFOP','CME','PFSI','OPK','BEAV','VLRS','LEN - CALL','DYN.WS','MZOR','DHI - CALL','KBH - CALL','ORLY','BUD','ODP','AMZN - CALL','GDX','CY - CALL','MTG','HRB - CALL','VRSK','AGO','MU - CALL','CKSW','ABT','SUNE','IMOS','CCJ','GM - CALL','ARCP','PVA','ALLY','TVPT','MDLZ','RLGY','YUM','CLI','LORL','DISH','LC','VIPS','ESNT','HLF'],
      'shares': [13216666,3327467,2412422,1575650,10670485,2796105,2537929,3169581,638503,2088268,2837240,1257677,1203508,1520842,2217176,772273,627344,7059711,1103279,30000,417367,4636946,550794,734508,664000,4566666,8066666,540666,625584,3277300,1215796,535556,801133,618835,516526,1266666,2099053,121622,358035,125753,806666,94600,1106700,240000,666666,403124,296594,246618,246666,502512,79807,1426282,440000,220000,2827003,106681,4366666,166666,166666,354247,135500,766666,238295,155652,56912,25000,36603,341214,68189,270000,105500,13000,32350,205100,4444604,120000,88600,115500,54194,61206,100389,1937715,10802786,125000,27300,306666,44600,75000,206666,27000,266666,70000,407580,82049,12400,7500,30000,121100,15500,31100,61502,107308,575952,64896,6256265,2645000,8313,8313,250000,19660,194000,12700,35000,400000,23920,19488,27000,1666666,250000,51811,500000,431800,416666,500000,80000,500000,121791,30000,187382,235600,54500,316011,87000,1182626,514565,205000,377000,32224,58400,883838,23000,761000,1000000,1560482,500000,231684,849924,930000,3130000,602181,1360000,1372921,2558794,1000000,3886300,6003509,2084595,2650000,1351731,1090000,655000,3094251,1055440,1226840,4500000,3801790,5981279,3448288]
    },
    'BillGates': {
      'stocks':  ['LBTYK','ARCO','RSG','LBTYA','AN','BP','WBA','UPS','CCI','KOF','ECL','FDX','TV','CAT','WMT','WM','CNI','DMND','BRK.B'],
      'shares': [3639349,3060500,1350000,2119515,1898716,7405614,3475398,4525329,5332900,6214719,4366425,3024999,16879103,11260857,11603000,18633672,17126874,0,73625314],
    },
    'CarlIcahn':{
      'stocks':  ['FDML','MTW','CHK','VLTC','ENZN','SSE','CVRR','RIG','MENT','NAV','GCI','NFLX','ARII','HLF','NUAN','HTZ','HOLX','EBAY','CVI','AAPL','IEP'],
      'shares': [138590141,10582660,73050000,4739620,5904863,4746421,6000000,21477900,16120289,16272524,14967373,1411926,11871268,17000000,60784623,51922405,34154879,46271370,71198718,52760848,108810845],
    },
  }
  async.each(guruList, function(guru, callback){
    var guruName = guru;


    new User({username: guruName}).fetch().then(function(found){
      if(found){
        // found, don't do anything
      } else {
        var user = new User({
          username: guruName,
          password: 'default',
          gurustatus: 'yes'
        });
        user.save().then(function(done){
          // create portfolio
          console.log("before creating portfolio")
          new Portfolio({name: guru + 'Portfolio', users_id: guru_id }).save().then(function(){
            // save all stocks
            console.log("In creating portfolio")
            var ctr = 0;
            async.each(guruStocks[guru].stocks, function(stock, callback){
              var share = guruStocks[guru].shares[ctr];
              console.log("inside creating stocks, " + stock + " " + share )
              new Stock({portfolios_id: portf_id, symbol: stock, shares: share }).save();
              ctr++;
            })

            portf_id++;
          });

          guru_id++;

        });
      }
    });
  })
}

module.exports = guruInit;


/*
Warren

'IBM','WFC','PCP','USB','PSX','FOXA','DE','LEE','UPS','KRFT','MDLZ','JNJ','DNOW','MEG','VRSK','GHC','LMCA','SNY','GE','LMCK','QSR','TMK','LBTYK','CBI','SU','COST','MTB','VZ','VRSN','USG','GM','GS','MCO','DTV','DVA','PG','WMT','AXP','KO','MA','V','WBC','LBTYA','VIAB','CHTR','BK','NOV'
79565115,470292359,4200792,83773390,7499450,6228097,17310090,88863,59400,192666,578000,327100,1825569,4646220,1563434,107575,4000000,3905875,10585502,8000000,8438225,6353727,7346968,10701110,22354294,4333363,5382040,15000928,12985000,39002016,41000000,12631531,24669778,31353468,38565570,52793078,60385293,151610700,400000000,5229756,9885160,3863195,10342793,8265079,5979136,20680420,1978895

Soros
'CY','EBAY','NBL','LEN','CRC','DHI','MSI','PHM','NEE','UAL','CVE','NFX','GLPI','WNR','ENDP','OKE','TPX','LSCC','SU','AGNPRA','AGN','GM','SCTY','FTI','TOL','JDSU','ENTR','PCL','MSCC','DHT','SFS','DTV','KRFT','VXX','CNQ','EXA','RDN','XEC','DK','CXO','ROVI','ENR','SYRG','QIHU','CDNS','W','PKG','DRC','BRCM','KKD','SPY','SFUN','FET','QUNR','PMCS','LOW','QTM','INFA','TDC','NVDA','TXT','MXL','EPAY','VSTO','VRTX','PCP','CBRL','ALJ','TRIP','RDC','JUNO','LNKD','UTX','FCX','BABA','CLDN','DEI','SGNT','KYTH','IPXL','CRTO','MBI','PLCM','BSMX','THRM','AUDC','T','TEO','CALX','TAP','AOSL','MJN','BHI','GSIT','OHI','ONCE','FLKS','ECR','AKRX','CFG','WIX','SUPN','BBG','CRI','CACQ','EDU','KODK.WS.A','KODK.WS','PTBI.WS','NAT','BIOA.WS','ECHO','WFT','AOI','KODK','MGNX','BLCM','TAS','ABEO','INVN','KEG','TWER','VMEM','GSAT','AMAT - CALL','EXXI','AFOP','CME','PFSI','OPK','BEAV','VLRS','LEN - CALL','DYN.WS','MZOR','DHI - CALL','KBH - CALL','ORLY','BUD','ODP','AMZN - CALL','GDX','CY - CALL','MTG','HRB - CALL','VRSK','AGO','MU - CALL','CKSW','ABT','SUNE','IMOS','CCJ','GM - CALL','ARCP','PVA','ALLY','TVPT','MDLZ','RLGY','YUM','CLI','LORL','DISH','LC','VIPS','ESNT','HLF'
13216666,3327467,2412422,1575650,10670485,2796105,2537929,3169581,638503,2088268,2837240,1257677,1203508,1520842,2217176,772273,627344,7059711,1103279,30000,417367,4636946,550794,734508,664000,4566666,8066666,540666,625584,3277300,1215796,535556,801133,618835,516526,1266666,2099053,121622,358035,125753,806666,94600,1106700,240000,666666,403124,296594,246618,246666,502512,79807,1426282,440000,220000,2827003,106681,4366666,166666,166666,354247,135500,766666,238295,155652,56912,25000,36603,341214,68189,270000,105500,13000,32350,205100,4444604,120000,88600,115500,54194,61206,100389,1937715,10802786,125000,27300,306666,44600,75000,206666,27000,266666,70000,407580,82049,12400,7500,30000,121100,15500,31100,61502,107308,575952,64896,6256265,2645000,8313,8313,250000,19660,194000,12700,35000,400000,23920,19488,27000,1666666,250000,51811,500000,431800,416666,500000,80000,500000,121791,30000,187382,235600,54500,316011,87000,1182626,514565,205000,377000,32224,58400,883838,23000,761000,1000000,1560482,500000,231684,849924,930000,3130000,602181,1360000,1372921,2558794,1000000,3886300,6003509,2084595,2650000,1351731,1090000,655000,3094251,1055440,1226840,4500000,3801790,5981279,3448288

Bill Gates
'LBTYK','ARCO','RSG','LBTYA','AN','BP','WBA','UPS','CCI','KOF','ECL','FDX','TV','CAT','WMT','WM','CNI','DMND','BRK.B'
3639349,3060500,1350000,2119515,1898716,7405614,3475398,4525329,5332900,6214719,4366425,3024999,16879103,11260857,11603000,18633672,17126874,0,73625314

Icahn
'FDML','MTW','CHK','VLTC','ENZN','SSE','CVRR','RIG','MENT','NAV','GCI','NFLX','ARII','HLF','NUAN','HTZ','HOLX','EBAY','CVI','AAPL','IEP'
138590141,10582660,73050000,4739620,5904863,4746421,6000000,21477900,16120289,16272524,14967373,1411926,11871268,17000000,60784623,51922405,34154879,46271370,71198718,52760848,108810845

*/
