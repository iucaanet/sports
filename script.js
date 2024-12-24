// ====================================
// Connect to UI handles
// ====================================
head_title  = document.getElementsByClassName("head-title")[0]
head_text   = document.querySelector(".head-text")
back_btn    = document.querySelector(".btn-back")


// ====================================
// Connect to Data
// ====================================
fetch("data\\data.json").then(
    response =>{
        if(!response.ok){
            throw new Error("HTTP Error: "+response.status);
        }
        return response.json();
    }
).then(jsonData=>{
    data=jsonData
})


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

    add_tab(label="Tab",iconname="crop_square",callback_fun=null){
        this.target.innerHTML +=`
            <div class="tab" onclick="${callback_fun?callback_fun.name:"passfun"}(this)">
                <div class="pill"></div>
                <div class="icon material-symbols-outlined">${iconname}</div>
                <div class="label">${label}</div>
            </div>
        `
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

    add_card_participant_single(name,gender){
        let logo = (gender.toLowerCase()[0]=="m")?"face":"face_3";
        this.target.innerHTML +=`
            <div class="card participant">
                <div class="material-symbols-outlined">${logo}</div>
                <div>${name}</div>
            </div>
        `
    }
    
    add_card_participant_double(names,genders){
        let logo0 = (genders[0].toLowerCase()=="male")?"face":"face_3";
        let logo1 = (genders[1].toLowerCase()=="male")?"face":"face_3";
        this.target.innerHTML +=`
            <div class="card participants">
                <div class="member">
                    <div class="material-symbols-outlined">${logo0}</div>
                    <div>${names[0]}</div>
                </div>
                <div class="member">
                    <div class="material-symbols-outlined">${logo1}</div>
                    <div>${names[1]}</div>
                </div>
            </div>            
        `
    }

}
wall = new WallManager()





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
}


// ====================================
// PAGE NAVIGATION
// ====================================
window.onload=function(){
    // onHomeLand();
    onMarathonLand();
}

// *********************************
// ===== HOME LANDING
// *********************************
function onHomeLand(){
    head_title.innerText = "IUCA Sports"
    head_text.innerText = "January 2025"
    back_btn.classList.add("hide");
    tabbar.clear();
    tabbar.add_tab("Recents","featured_play_list",onHome_Recents_Click);
    tabbar.add_tab("Events","local_activity",onHome_Events_Click);
    SetDefaultTab(0);
}

function onHome_Recents_Click(sender){
    commonTabClickActions(sender,false);
    wall.add_section("Todays Events");
    wall.add_text("This section is under development.");
    wall.add_section("Yesterday Events");
    wall.add_text("This section is under development.");

}

function onHome_Events_Click(sender){
    commonTabClickActions(sender);
    wall.add_card_event("Badminton","Starts from 2nd Jan","./media/badminton.svg",onBadmintonLand);
    wall.add_card_event("Table Tennis","Starts from 2nd Jan","./media/table_tennis.svg",onTableTennishLand);
    wall.add_card_event("Marathon","Starts from 2nd Jan","./media/marathon.svg",onMarathonLand);
    wall.add_card_event("Chess","Starts from 2nd Jan","./media/chess_queen.svg",onChessLand);
    wall.add_card_event("Cricket","Starts from 2nd Jan","./media/cricket.svg",onCricketLand);
}



// *********************************
// ===== BADMINTON LANDING
// *********************************
function onBadmintonLand(){
    head_title.innerText="Badminton"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Players","groups",onBadminton_Player_Click);
    tabbar.add_tab("Matches","sports",onBadminton_Matches_Click);
    tabbar.add_tab("Points","leaderboard",onBadminton_Points_Click)
    SetDefaultTab(0);
}


function onBadminton_Player_Click(sender){
    commonTabClickActions(sender);
    // players = data["badminton"]["mens_single"]["participants"];
    // players.forEach(player=>{
    //     wall.add_card_participant_single(player["name"],player["gender"]);
    //     // console.log(player["name"]);
    //     // console.log(player["gender"]);
    // })
    wall.add_text("Player filling under development.")
}

function onBadminton_Matches_Click(sender){
    commonTabClickActions(sender);
    wall.add_text("Match filling under development.")
}

function onBadminton_Points_Click(sender){
    commonTabClickActions(sender);
    wall.add_text("Leadeboard filling under development.")
}









// *********************************
// ===== TABLE TENNIS LANDING
// *********************************
function onTableTennishLand(){
    head_title.innerText="Table tennis"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Players","groups");
    tabbar.add_tab("Matches","sports");
    tabbar.add_tab("Points","leaderboard")
    SetDefaultTab(0);
}



// *********************************
// ===== MARATHON LANDING
// *********************************
function onMarathonLand(){
    head_title.innerText="Marathon"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Participants","groups",onMarathon_Participants_Click);
    tabbar.add_tab("Route","route",onMarathon_Route_Click);
    tabbar.add_tab("Readme","format_list_bulleted",onMarathon_Readme_Click);
    SetDefaultTab(0);
}

function onMarathon_Participants_Click(sender){
    commonTabClickActions(sender);
    wall.add_section("Fun Run");
    wall.add_section("Junior Run");
    wall.add_section("Open Run");
    wall.add_section("Veteran Run");

    
}

function onMarathon_Route_Click(sender){
    commonTabClickActions(sender);
    
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
    head_title.innerText="Chess"
    back_btn.classList.remove("hide");
    tabbar.clear();
    tabbar.add_tab("Players","groups");
    tabbar.add_tab("Matches","sports");
    tabbar.add_tab("Points","leaderboard")
    SetDefaultTab(0);
}




// *********************************
// ===== CRICKET LANDING
// *********************************
function onCricketLand(){
    head_title.innerText="Cricket"
    back_btn.classList.remove("hide");

    tabbar.clear();
    tabbar.add_tab("Players","groups");
    tabbar.add_tab("Matches","sports");
    tabbar.add_tab("Points","leaderboard")
    SetDefaultTab(0);
}








// *********************************
// ===== HELP LANDING
// *********************************
function onHelp_Click(){
    wall.clear();
    cleanActiveTabs();
    wall.add_section("About")
    wall.add_text("This website is a student-led initiative created to provide information about sports events at <b>IUCAA</b>. It is not officially associated with or endorsed by the institute administration. The content and updates shared on this platform are independently managed and reflect the efforts of students, not the official policies or communications of the institute.")
    
    wall.add_section("Support")
    
    wall.add_text(
        `For any changes related to event-specific details such as adding players, change event schedules or match partners, kindly contact the event organizers as listed below.
        <br/>
        <br/>
        <li><b>Badminton</b> : Sourav Das & Ranit Behera</li>
        <li><b>Table Tennis</b> : First Last & First Last</li>
        <li><b>Chess</b> : First Last & First Last</li>
        <li><b>Marathon</b> : First Last & First Last</li>
        <li><b>Cricket</b> : First Last & First Last</li>
        `
    )
    
    wall.add_section("Feature Request")
    wall.add_text("If you wish to suggest new features or provide additional information, please reach out to the developers, <b>Ranit Behera</b> and <b>Anirban Kopty</b>, for assistance.")
    
}




























































