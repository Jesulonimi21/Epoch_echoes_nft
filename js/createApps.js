const algosdk = require('algosdk');
var {compileStatelessProgram, compileProgram, compileApprovalProgram,
    compileClearProgram, getCreateAppTxn, waitForConfirmation,
   getAssetClawbackTxn, getOptInTxn, groupTxns, getPrimarySaleTxn, fundFromFaucet, getLsig } = require('./utils.js');

//Create apps and get addresses

const AmericanArtist = "JQ3QOVBYDKSMZA42HB3DCWJWS4L6KR7ZMFUG5IYECEAM4WE3PP74GG6ZNM";
const Muxx = "HGIMASMUMZAI5SCNOYR65TIQM4JWLE736FERTFPCPUNZSQRXK42Q5VMNMQ";
const Jacqueline = "5EP6AOHJBRLL7G2W74Q6NNOZOUCDT6F35ZRXSNTU4UHTHWDZVTDOAYTFAE";
const Lawrence = "JUDGEZENUFSP3UGRQLGN7Q5QE4V3YIYQNZ76SI7Z7IXMKBYMK2JAJE4PWU";
const Jen = "DHTJB4G5KZI3H3AUBFMREUPPLQJMLG65NOREYDLUYUPVKTKJPQM5WF2WNA";
const RonaldVirginia = "3BHZPTXX6Q3GRS7URKAXSO7BT36HI2NLV4SLSUDTSFKMIH56NPZKK7HKUU";
const SarahRara = "WELR5BBI456XXE4GOVX4FK3GE2T2PA3LJ3VTPY7RHPDCL5H3CIXKUWNGS4";
const Lacma = "QQX5Y647GO7VLG33ZQWKEHO2OPXPVCEY7QNNE2AK2AVA4HYFFD4MJNFYFM";
let epochAddress = "VTAUB5LOVTWKXICWEDBO5UG2JNNGEW7ULRB4PQB23DGRKSAXDVPORQNZJE";
const ZeroAddress = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ";
const nftEdition = 1
const isApEdition = 0
const initialPrice = 9494;
( async () => {

    try{
        const asas = [70789291, 70789350]
        let appIds = [70791284, 70791285];
        const assetCreator = algosdk.mnemonicToSecretKey( "easy era civil sample soap execute say stuff evolve table grace love mammal glance occur network tree august faculty federal direct total youth abstract story");
        const token = { 'X-API-Key':'ADRySlL0NK5trzqZGAE3q1xxIqlQdSfk1nbHxTNe'};
        const server = "https://testnet-algorand.api.purestake.io/ps2"
        const port = "";
        const client = new algosdk.Algodv2(token, server, port);
        let params = await client.getTransactionParams().do();
        const approvalProgram = await compileApprovalProgram(client);
        const clearProgram = await compileClearProgram(client);
        epochAddress = assetCreator.addr;
        console.log(assetCreator.addr);
        let createAppTxns = await Promise.all (asas.map( async (el) => {
            let res =  await getCreateAppTxn(assetCreator.addr, params, approvalProgram, clearProgram,
                assetCreator.addr, nftEdition, isApEdition, el, ZeroAddress, epochAddress, AmericanArtist,
                Muxx, Jacqueline, Lawrence, Jen, RonaldVirginia, SarahRara, Lacma, initialPrice);

                return res;
        }));
        createAppTxns = await groupTxns(createAppTxns);
        let signedTxns = createAppTxns.map(el =>{
           return el.signTxn(assetCreator.sk);
        });
    
      let txT =  await client.sendRawTransaction(signedTxns).do();

    
    console.log(txT);
    }catch(error){
        console.error(error)
    }
 

    
})()

