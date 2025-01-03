// ====================================
// Connect to UI handles
// ====================================
head_title  = document.getElementsByClassName("head-title")[0]
head_text   = document.querySelector(".head-text")
back_btn    = document.querySelector(".btn-back")
help_btn    = document.querySelector(".btn-help")


// Google Map
// var myOptions = {
//     center: new google.maps.LatLng(40.744556,-73.987378),
//     zoom: 18,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     disableDefaultUI: true
// };

// var map = new google.maps.Map(document.getElementsByClassName("gmap")[0], myOptions);






// ====================================
// Connect to Data
// ====================================
marathonData = MAR25;
badmintonData = BAD25;
tabletennisData = TAB25;

// TODO: Alternate
function passfun(sender){

}

// ====================================
// TAB MANAGER
// ====================================
class TabManger{
    constructor(){
        this.target = document.getElementsByClassName("tabbar")[0]
    }

    clear(){
        this.target.innerHTML = "";
    }

    hide(){
        this.target.classList.add("hide")
    }
    
    unhide(){
        this.target.classList.remove("hide")
    }


    add_tab(label="Tab",iconname="crop_square",callback_fun=null){
        this.target.innerHTML +=`
            <div class="tab" onclick="${callback_fun?callback_fun.name:"passfun"}(this)">
                <div class="pill"></div>
                <div class="icon material-symbols-outlined">${iconname}</div>
                <div class="label">${label}</div>
            </div>
        `
    }

    click_active(){
        this.target.querySelectorAll(".active")[0].click();
    }
    
    click_tab(index){
        this.target.querySelectorAll(".tab")[index].click();
    }
}
tabbar = new TabManger();

// ====================================
// WALL MANAGER
// ====================================
class WallManager{
    constructor(){
        this.target = document.getElementsByClassName("wall")[0]
    }
    
    clear(){
        this.target.innerHTML = "";
    }

    add_section(text){
        this.target.innerHTML += `<div class="card span section">${text}</div>`
    }
    
    add_text(text,align="center"){
        this.target.innerHTML += `<div class="card span text ${align}">${text}</div>`
    }
    
    add_card_event(event_title,event_msg,logo_path,callback_fun=null){
        this.target.innerHTML +=`
            <div class="card event" onclick="${callback_fun?callback_fun.name:"passfun"}(this)">
                <img class="svg-logo" src="${logo_path}"></svg>
                <div class="text">
                    <div class="title">${event_title} ></div>
                    <div class="msg">${event_msg}</div>
                </div>
            </div>
        
        `
    }

    add_card_participant_single(name,gender,msg="",sidetext=""){
        let logo = (gender.toLowerCase()[0]=="m")?"face":(gender.toLowerCase()[0]=="f")?"face_3":"";
        this.target.innerHTML +=
        `
        <div class="card participant">
            <div class="icon material-symbols-outlined">${logo}</div>
            <div class="text">
                <div class="name">${name}</div>
                <div class="msg">${msg}</div>
            </div>
            <div class="point">${sidetext}</div>
        </div>
        `
    }
    
    add_card_participant_double(names,genders,msg="",sidetext=""){
        let logo0 = (genders[0].toLowerCase()[0]=="m")?"face":(genders[0].toLowerCase()[0]=="f")?"face_3":"";
        let logo1 = (genders[1].toLowerCase()[0]=="m")?"face":(genders[1].toLowerCase()[0]=="f")?"face_3":"";
        this.target.innerHTML +=`
            <div class="card participants">
                <div class="member-info">
                    <div class="members">
                        <div>
                            <div class="icon material-symbols-outlined">${logo0}</div>
                            <div class="name">${names[0]}</div>
                        </div>
                        <div>
                            <div class="icon material-symbols-outlined">${logo1}</div>
                            <div class="name">${names[1]}</div>
                        </div>
                    </div>
                    <div class="point">${sidetext}</div>
                </div>
                <div class="msg ${msg==""?"hide":""}">${msg}</div>
            </div>  
           
        `
    }

    add_card_match(datetime,cat,g1n1,g1n2,g2n1,g2n2,g1g1,g1g2,g2g1,g2g2,msg,r1s1=0,r1s2=0,r2s1=0,r2s2=0,r3s1=0,r3s2=0,mt,mno=""){
        let logog1g1 = (g1g1.toLowerCase()[0]=="m")?"face":(g1g1.toLowerCase()[0]=="f")?"face_3":"";
        let logog1g2 = (g1g2.toLowerCase()[0]=="m")?"face":(g1g2.toLowerCase()[0]=="f")?"face_3":"";
        let logog2g1 = (g2g1.toLowerCase()[0]=="m")?"face":(g2g1.toLowerCase()[0]=="f")?"face_3":"";
        let logog2g2 = (g2g2.toLowerCase()[0]=="m")?"face":(g2g2.toLowerCase()[0]=="f")?"face_3":"";
        let msg_hide = (msg=="")?"hide":""
        let score_hide = (r1s1==0 && r1s2==0)?"hide":""
        cat = (mt=="F")?"Final":(mt=="SF")?"SF":cat


        this.target.innerHTML+=`
        <div class="card match">
            <div class="match-info">
                <div>${mno}</div>
                <div class="datetime">${datetime}</div>
                <div class="category">${cat}</div>
            </div>
            <div class="group1">
                <div class="member">
                    <div class="icon material-symbols-outlined">${logog1g1}</div>
                    <div class="name">${g1n1}</div>
                </div>
                <div class="member">
                    <div class="icon material-symbols-outlined">${logog1g2}</div>
                    <div class="name">${g1n2}</div>
                </div>
            </div>
            <div class="scores ${score_hide}">
                <div class="g1">
                    <div class="m1 ${r1s1==0 && r1s2==0?"faint":""}">${r1s1==0?"00":r1s1.toString().padStart(2,"0")}</div>
                    <div class="m2 ${r2s1==0 && r2s2==0?"faint":""}">${r2s1==0?"00":r2s1.toString().padStart(2,"0")}</div>
                    <div class="m3 ${r3s1==0 && r3s2==0?"faint":""}">${r3s1==0?"00":r3s1.toString().padStart(2,"0")}</div>
                </div>
                <div class="g2">
                    <div class="m1 ${r1s1==0 && r1s2==0?"faint":""}">${r1s2==0?"00":r1s2.toString().padStart(2,"0")}</div>
                    <div class="m2 ${r2s1==0 && r2s2==0?"faint":""}">${r2s2==0?"00":r2s2.toString().padStart(2,"0")}</div>
                    <div class="m3 ${r3s1==0 && r3s2==0?"faint":""}">${r3s2==0?"00":r3s2.toString().padStart(2,"0")}</div>
                </div>
            </div>
            <div class="group2">
                <div class="member">
                    <div class="icon material-symbols-outlined">${logog2g1}</div>
                    <div class="name">${g2n1}</div>
                </div>
                <div class="member">
                    <div class="icon material-symbols-outlined">${logog2g2}</div>
                    <div class="name">${g2n2}</div>
                </div>
            </div>
            <div class="msg ${msg_hide}">${msg}</div>
        </div>
        `
    }

}
wall = new WallManager()


// ====================================
// CATEGORY MANAGEMENT
// ====================================
function toggleCatActive(sender){
    sender.classList.toggle("active");
    // console.log(catbar.get_active_categories())
    tabbar.click_active();



}

class CategoryManager{
    constructor(){
        this.target = document.getElementsByClassName("catbar")[0];
    }

    clear(){
        this.target.innerHTML = ""
    }

    hide(){
        this.target.classList.add("hide")
    }
    
    unhide(){
        this.target.classList.remove("hide")
    }

    add_category(name,state=""){
        this.target.innerHTML += `
            <div class="${state}" onclick="toggleCatActive(this)">${name}</div>
        `
    }

    get_active_categories(){
        let act_cat=Array.from(this.target.querySelectorAll('div.active')).map(div => div.textContent);
        if (act_cat==""){
            if (head_title.innerText=="Badminton"){
                act_cat=["None"];
            }else if (head_title.innerText=="Table Tennis"){
                act_cat=["A","B","C","D"];
            }
        }
        return act_cat
    }

}

catbar = new CategoryManager()



// ====================================
// TAB NAVIGATION
// ====================================
function SetDefaultTab(number){
    const tabs = document.querySelectorAll(".tab");
    tabs[number].click();
}

function cleanActiveTabs(){
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab=>{
                tab.classList.remove("active");
    });
}

function commonTabClickActions(sender,clearwall=true){
    cleanActiveTabs();
    sender.classList.add("active");
    if(clearwall){
        wall.clear();

    }
    help_btn.innerText="help";
}

function commonPageLandAction(reset_catbar=true){
    if (reset_catbar){
        catbar.clear();
        catbar.hide();
    }
}





// ====================================
// PAGE NAVIGATION
// ====================================
window.onload=function(){
    onHomeLand(0);
    // onMarathonLand();
    // onBadmintonLand();
    // onTableTennisLand();
}

// *********************************
// ===== HOME LANDING
// *********************************
function onHomeLand(tab=0){
    commonPageLandAction()
    head_title.innerText = "IUCAA Sports"
    head_text.innerText = "January 2025"
    back_btn.classList.add("hide");
    tabbar.clear();
    tabbar.add_tab("Recents","featured_play_list",onHome_Recents_Click);
    tabbar.add_tab("Events","local_activity",onHome_Events_Click);
    tabbar.unhide();
    SetDefaultTab(tab);
}

function onHome_Recents_Click(sender){
    commonTabClickActions(sender);
    matches = badmintonData.match;

    wall.add_section("Upcoming Badminton Events");
    
    let day=getFormattedDate();
    day="4th Jan";

    matches.forEach(mat=>{
        if (mat.date===day){
            wall.add_card_match(mat.date_time, mat.category, 
                mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                mat.message, 
                mat.scores.round1[0], mat.scores.round1[1], 
                mat.scores.round2[0], mat.scores.round2[1], 
                mat.scores.round3[0], mat.scores.round3[1],
                mat.match_type);
            }

    })




}

function onHome_Events_Click(sender){
    commonTabClickActions(sender);
    wall.add_card_event("Badminton","Starts From 4th January","./media/badminton.svg",onBadmintonLand);
    wall.add_card_event("Table Tennis","","./media/table_tennis.svg",onTableTennisLand);
    wall.add_card_event("Marathon","On 12th January","./media/marathon.svg",onMarathonLand);
    wall.add_card_event("Chess","","./media/chess_queen.svg",onChessLand);
    wall.add_card_event("Cricket","","./media/cricket.svg",onCricketLand);
}



// *********************************
// ===== BADMINTON LANDING
// *********************************



function onBadmintonLand(){
    commonPageLandAction()
    head_title.innerText="Badminton"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Players","groups",onBadminton_Player_Click);
    tabbar.add_tab("Matches","sports",onBadminton_Matches_Click);
    tabbar.add_tab("Points","leaderboard",onBadminton_Points_Click)
    SetDefaultTab(0);
    
    catbar.clear()
    catbar.add_category("WS")
    catbar.add_category("WD")
    catbar.add_category("MS")
    catbar.add_category("MD")
    catbar.add_category("XD")
    catbar.add_category("MS-U18")
    catbar.add_category("MD-U18")
    catbar.unhide()
}


function onBadminton_Player_Click(sender){
    commonTabClickActions(sender);
    groups = badmintonData.group;
    let acat=catbar.get_active_categories();
    
    if (acat.includes("None")){acat=["WS","WD","MS","MD","XD","MS-U18","MD-U18"]}

    // Women's Single
    if (acat.includes('WS')){
        wall.add_section("Women's Single");
        groups.forEach(grp=>{
            if (grp.category=='WS'){
                wall.add_card_participant_single(grp.member1,grp.gender1,grp.message,grp.played+"/2");
            }
        })
    }
    
    // Women's Double
    if (acat.includes('WD')){
        wall.add_section("Women's Double");
        groups.forEach(grp=>{
            if (grp.category=='WD'){
                wall.add_card_participant_double([grp.member1, grp.member2],[grp.gender1,grp.gender2],grp.message,grp.played+"/2");
            }
        })
    }
    
    // Men's Single
    if (acat.includes('MS')){
        wall.add_section("Men's Single");
        groups.forEach(grp=>{
            if (grp.category=='MS'){
                wall.add_card_participant_single(grp.member1,grp.gender1,grp.message,grp.played+"/2");
            }
        })
    }
    
    // Men's Double
    if (acat.includes('MD')){
        wall.add_section("Men's Double");
        groups.forEach(grp=>{
            if (grp.category=='MD'){
                wall.add_card_participant_double([grp.member1, grp.member2],[grp.gender1,grp.gender2],grp.message,grp.played+"/2");
            }
        })
    }
    
    // Mixed Double
    if (acat.includes('XD')){
        wall.add_section("Mixed Double");
        groups.forEach(grp=>{
            if (grp.category=='XD'){
                wall.add_card_participant_double([grp.member1, grp.member2],[grp.gender1,grp.gender2],grp.message,grp.played+"/1");
            }
        })



    }
    
    // Men's Single - Under 18
    if (acat.includes('MS-U18')){
        wall.add_section("Men's Single (U18)");
        groups.forEach(grp=>{
            if (grp.category=='MS-U18'){
                wall.add_card_participant_single(grp.member1,grp.gender1,grp.message,grp.played+"/2");
            }
        })
    }

    // Men's Double - Under 18
    if (acat.includes('MD-U18')){
        wall.add_section("Men's Double (U18)");
        groups.forEach(grp=>{
            if (grp.category=='MD-U18'){
                wall.add_card_participant_double([grp.member1, grp.member2],[grp.gender1,grp.gender2],grp.message,grp.played+"/1");
            }
        })
    }
}

function getFormattedDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';

    return `${day}${suffix} ${month}`;
}




function onBadminton_Matches_Click(sender){
    commonTabClickActions(sender);
    matches = badmintonData.match;
    let acat=catbar.get_active_categories();



    if (acat.includes("None")){
        last_date = ""
        matches.forEach(mat=>{
            if (last_date!=mat.date){
                wall.add_section(mat.date.replace("Jan","January"));
                last_date=mat.date;
            }
            
            wall.add_card_match(mat.date_time, mat.category, 
                mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                mat.message, 
                mat.scores.round1[0], mat.scores.round1[1], 
                mat.scores.round2[0], mat.scores.round2[1], 
                mat.scores.round3[0], mat.scores.round3[1],
                mat.match_type);
    
        })
    }



    // Women's Single
    if (acat.includes('WS')){
        wall.add_section("Women's Single");
        matches.forEach(mat=>{
            if (mat.category=='WS'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })
    }
    
    // Women's Double
    if (acat.includes('WD')){
        wall.add_section("Women's Double");
        matches.forEach(mat=>{
            if (mat.category=='WD'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })
    }
    
    // Men's Single
    if (acat.includes('MS')){
        wall.add_section("Men's Single");
        matches.forEach(mat=>{
            if (mat.category=='MS'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })
    }
    
    // Men's Double
    if (acat.includes('MD')){
        wall.add_section("Men's Double");
        matches.forEach(mat=>{
            if (mat.category=='MD'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })
    }
    
    // Mixed Double
    if (acat.includes('XD')){
        wall.add_section("Mixed Double");
        matches.forEach(mat=>{
            if (mat.category=='XD'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })
    }
    
    // Men's Single - Under 18
    if (acat.includes('MS-U18')){
        wall.add_section("Men's Single (U18)");
        matches.forEach(mat=>{
            if (mat.category=='MS-U18'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })

    }

    // Men's Double - Under 18
    if (acat.includes('MD-U18')){
        wall.add_section("Men's Double (U18)");
        matches.forEach(mat=>{
            if (mat.category=='MD-U18'){
                wall.add_card_match(mat.date_time, mat.category, 
                    mat.group1.name1, mat.group1.name2, mat.group2.name1, mat.group2.name2, 
                    mat.group1.gender1, mat.group1.gender2, mat.group2.gender1, mat.group2.gender2, 
                    mat.message, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.match_type);
            }
        })    
    }


    // Scroll to latest
    let scroltarget=null;
    let today=getFormattedDate().replace("Jan","January");
    // today="10th January"
    if (acat.includes("None")){
        date_texts = document.querySelectorAll(".card.section");
        date_texts.forEach(dt=>{
            if(dt.innerText===today){
                scroltarget=dt;
                return
            }
        }) 

        if (scroltarget!==null){
            scroltarget.scrollIntoView();
        }
    }




}

function onBadminton_Points_Click(sender){
    commonTabClickActions(sender);
    wall.add_text("The points will be updated following the completion of the initial few matches.")
}









// *********************************
// ===== TABLE TENNIS LANDING
// *********************************
function onTableTennisLand(){
    commonPageLandAction()
    head_title.innerText="Table Tennis"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Players","groups",onTableTennis_Player_Click);
    tabbar.add_tab("Matches","sports",onTableTennis_Matches_Click);
    tabbar.add_tab("Points","leaderboard",onTableTennis_Points_Click)
    SetDefaultTab(0);

    catbar.clear()
    catbar.add_category("A")
    catbar.add_category("B")
    catbar.add_category("C")
    catbar.add_category("D")
    catbar.unhide()
}



function onTableTennis_Player_Click(sender){
    commonTabClickActions(sender);

    groups = tabletennisData.group;
    let acat=catbar.get_active_categories();
    
    // Group A
    if (acat.includes('A')){
        wall.add_section("Group A");
        groups.forEach(grp=>{
            if (grp.category=='A'){
                wall.add_card_participant_single(grp.member1,"",grp.msg,grp.point);
            }
        })
    }

    // Group B
    if (acat.includes('B')){
        wall.add_section("Group B");
        groups.forEach(grp=>{
            if (grp.category=='B'){
                wall.add_card_participant_single(grp.member1,"",grp.msg,grp.point);
            }
        })
    }

    // Group C
    if (acat.includes('C')){
        wall.add_section("Group C");
        groups.forEach(grp=>{
            if (grp.category=='C'){
                wall.add_card_participant_single(grp.member1,"",grp.msg,grp.point);
            }
        })
    }

    // Group D
    if (acat.includes('D')){
        wall.add_section("Group D");
        groups.forEach(grp=>{
            if (grp.category=='D'){
                wall.add_card_participant_single(grp.member1,"",grp.msg,grp.point);
            }
        })
    }
    
}

function onTableTennis_Matches_Click(sender){
    commonTabClickActions(sender);
    matches = tabletennisData.match;
    let acat=catbar.get_active_categories();

    // Groups A
    if (acat.includes('A')){
        wall.add_section("Group A");
        matches.forEach(mat=>{
            if (mat.category=='A'){
                wall.add_card_match("Match "+mat.match_no, mat.category, 
                    mat.group1.name1, "", mat.group2.name1, "", 
                    "", "", "", "", 
                    mat.msg, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.category,"");
            }
        })
    }

    // Groups B
    if (acat.includes('B')){
        wall.add_section("Group B");
        matches.forEach(mat=>{
            if (mat.category=='B'){
                wall.add_card_match("Match "+mat.match_no, mat.category, 
                    mat.group1.name1, "", mat.group2.name1, "", 
                    "", "", "", "", 
                    mat.msg, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.category,"");
            }
        })
    }

    // Groups C
    if (acat.includes('C')){
        wall.add_section("Group C");
        matches.forEach(mat=>{
            if (mat.category=='C'){
                wall.add_card_match("Match "+mat.match_no, mat.category, 
                    mat.group1.name1, "", mat.group2.name1, "", 
                    "", "", "", "", 
                    mat.msg, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.category,"");
            }
        })
    }

    // Groups D
    if (acat.includes('D')){
        wall.add_section("Group D");
        matches.forEach(mat=>{
            if (mat.category=='D'){
                wall.add_card_match("Match "+mat.match_no, mat.category, 
                    mat.group1.name1, "", mat.group2.name1, "", 
                    "", "", "", "", 
                    mat.msg, 
                    mat.scores.round1[0], mat.scores.round1[1], 
                    mat.scores.round2[0], mat.scores.round2[1], 
                    mat.scores.round3[0], mat.scores.round3[1],
                    mat.category,"");
            }
        })
    }


}

function onTableTennis_Points_Click(sender){
    commonTabClickActions(sender);
    wall.add_text("The points will be updated following the completion of the initial few matches.")
}







// *********************************
// ===== MARATHON LANDING
// *********************************
function onMarathonLand(){
    commonPageLandAction()
    head_title.innerText="Marathon"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Participants","groups",onMarathon_Participants_Click);
    // tabbar.add_tab("Route","route",onMarathon_Route_Click);
    tabbar.add_tab("Readme","format_list_bulleted",onMarathon_Readme_Click);
    SetDefaultTab(0);
}

function onMarathon_Participants_Click(sender){
    commonTabClickActions(sender);
    wall.add_section("Fun Run");
    marathonData.fun_run.forEach(partcipant=>{
        wall.add_card_participant_single(partcipant.name,partcipant.gender,partcipant.msg,partcipant.point);
    })
    
    wall.add_section("Junior Run");
    marathonData.junior_run.forEach(partcipant=>{
        wall.add_card_participant_single(partcipant.name,partcipant.gender,partcipant.msg,partcipant.point);
    })
    
    wall.add_section("Open Run");
    marathonData.open_run.forEach(partcipant=>{
        wall.add_card_participant_single(partcipant.name,partcipant.gender,partcipant.msg,partcipant.point);
    })
        
    wall.add_section("Veteran Run");
    marathonData.veteran_run.forEach(partcipant=>{
        wall.add_card_participant_single(partcipant.name,partcipant.gender,partcipant.msg,partcipant.point);
    })

    
}

function onMarathon_Route_Click(sender){
    commonTabClickActions(sender);
    wall.add_section("Route");
    wall.clear()
    wall.target.innerHTML +=`
            <div class="card map span">
                </div>
    `
    
}

function onMarathon_Readme_Click(sender){
    commonTabClickActions(sender);
    wall.add_section("Instructions");
    wall.add_text(
        `
        <ul>
        <li>Report to start line at least 30 minutes before the start time i.e. by <b style="color:red">7:30AM</b>.</li>
        <li>Follow the marked route without using shortcuts.</li>
        <li>Avail medical assistance at checkpoints if needed.</li>

        </ul>
        `,"");
        
        wall.add_section("Categories");
        wall.add_text(
            `
            There are following four categories based on age group:
            <ul>
                <li><b>Fun Run</b> : 5y to 10y.</li>
                <li><b>Junior Run</b> : 11y to 16y.</li>
                <li><b>Open Run</b> : 17y to 39y.</li>
                <li><b>Veterans Run</b> : above 40y.</li>
            </ul>
            `,"");
    


    wall.add_section("Disqualification Rules")
    wall.add_text(
        `
        <ul>
            <li>using shortcuts without following the marked route.</li>
            <li>obstructing and cheating during the run.</li>
            <li>Not finishing within the time under Did-Not-Finish (<b>DNF</b>).</>
        </ul>
        `,"");

    wall.add_section("Facilities")
    wall.add_text(
        `
        <ul>
            <li><b>Hydration Point</b>: Water and Energy Drink.</li>
            <li><b>Medical Aid</b>: First-aid along the route near checkpoints.</li>
            <li><b>Refreshment</b>: Post-run refreshment includes fruits, tea, biscuits and poha/upma for all participants.</li>
            <li><b>Guide</b>: Volunteers to guide participants and provide support.</li>
        </ul>
        `,"")

    wall.add_section("Awards")
    wall.add_text(`
        <ul>
            <li><b>Medals</b> for all finishers.</li>
            <li><b>Trophies</b> for winners in each categories.</li>
        </ul>
        `,"")

}



// *********************************
// ===== CHESS LANDING
// *********************************
function onChessLand(){
    commonPageLandAction()
    head_title.innerText="Chess"
    back_btn.classList.remove("hide");
    
    tabbar.clear();
    tabbar.hide();
    wall.clear();
    wall.add_text("No data available at the moment. Please check back later.")
}




// *********************************
// ===== CRICKET LANDING
// *********************************
function onCricketLand(){
    commonPageLandAction()
    head_title.innerText="Cricket"
    back_btn.classList.remove("hide");

    tabbar.clear();
    tabbar.hide();
    wall.clear();
    wall.add_text("No data available at the moment. Please check back later.")
}








// *********************************
// ===== HELP LANDING
// *********************************
function onHelp_Click(){
    commonPageLandAction(false)
    if(help_btn.innerText==="help"){
        help_btn.innerText="cancel";
        wall.clear();
        cleanActiveTabs();
        wall.add_section("About")
        wall.add_text("This web interface is a student-led initiative created to provide information about sports events at <b>IUCAA</b>. It is not officially associated with or endorsed by the institute administration. The content and updates shared on this platform are independently managed and reflect the efforts of students, not the official policies or communications of the institute.")
        
        wall.add_section("Organizers")
        wall.add_text(
                `For any changes related to event-specific details such as adding players, change event schedules or match partners, kindly contact the event organizers as listed below.
                <br/>
                <br/>
                <li><b>Badminton</b> : Sourav Das & Ranit Behera</li>
                <li><b>Table Tennis</b> : </li>
                <li><b>Marathon</b> : </li>
                <li><b>Chess</b> : </li>
                <li><b>Cricket</b> : </li>
                `
            ,"left")
        
            wall.add_section("Data Privacy")
        wall.add_text("For privacy reasons, only the 'name' and 'gender' of participants are uploaded to the web. If you wish for this information to be anonymized, please contact the organizers.")
        

        wall.add_section("Feature Request")
        wall.add_text("If you wish to suggest new features or need additional information, please reach out to the developers, <b>Ranit Behera</b> and <b>Anirban Kopty</b>, for assistance.")
        
        wall.add_section("Last Updated")
        wall.add_text("4<sup>th</sup> January, 1:20 AM IST");

    }else{
        help_btn.innerText="help";
        tabbar.click_tab(0);
    }
        
}










{/* <div class="card pts-table span">
                <table>
                    <tr>
                        <th>#</td>
                        <th>Name</td>
                        <th>Points</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Albert Einstein</td>
                        <td>7.8</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Albert Einstein</td>
                        <td>7.8</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Albert Einstein</td>
                        <td>7.8</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Albert Einstein</td>
                        <td>7.8</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Albert Einstein</td>
                        <td>7.8</td>
                    </tr>

                </table>
            </div>



 */}














































