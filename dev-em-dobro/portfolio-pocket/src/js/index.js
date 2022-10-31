const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
    tab.addEventListener("click", function() {

        if (tab.classList.contains("selected")) {
            return;
        }

        tabSelection(tab)
        showInfo(tab)
    });
});

function tabSelection(tab) {
    const selectedTab = document.querySelector(".tab.selected");
    selectedTab.classList.remove("selected");

    tab.classList.add("selected");
}

function showInfo(tab){
    const selectedInfo = document.querySelector(".info.selected");
    selectedInfo.classList.remove("selected");

    const elementId = `info-${tab.id}`

    const info = document.getElementById(elementId)
    info.classList.add("selected")
}