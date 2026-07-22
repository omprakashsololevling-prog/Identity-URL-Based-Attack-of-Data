// Load scan history when page opens
window.onload = function () {
    loadHistory();
};

// Scan URL
function scanURL() {

    let ip = document.getElementById("ip").value.trim();
    let url = document.getElementById("url").value.trim().toLowerCase();

    if (ip === "" || url === "") {
        alert("Please enter both IP Address and URL.");
        return;
    }

    let status = "Safe";
    let attack = "None";
    let risk = 5;

    // SQL Injection
    if (
        url.includes("' or '1'='1") ||
        url.includes("union select") ||
        url.includes("drop table") ||
        url.includes("insert into")
    ) {
        status = "Malicious";
        attack = "SQL Injection";
        risk = 95;
    }

    // XSS
    else if (
        url.includes("<script>") ||
        url.includes("javascript:") ||
        url.includes("onerror=")
    ) {
        status = "Malicious";
        attack = "Cross Site Scripting (XSS)";
        risk = 90;
    }

    // Directory Traversal
    else if (
        url.includes("../") ||
        url.includes("..\\")
    ) {
        status = "Malicious";
        attack = "Directory Traversal";
        risk = 88;
    }

    // Phishing
    else if (
        url.includes("login") ||
        url.includes("verify") ||
        url.includes("secure-account") ||
        url.includes("bank")
    ) {
        status = "Suspicious";
        attack = "Possible Phishing";
        risk = 70;
    }

    // Display results
    document.getElementById("status").innerHTML = status;
    document.getElementById("attack").innerHTML = attack;
    document.getElementById("risk").innerHTML = risk + "%";

    // Save scan
    saveHistory(ip, url, status, attack, risk);

    // Refresh history table
    loadHistory();
}

// Save to browser storage
function saveHistory(ip, url, status, attack, risk) {

    let scans = JSON.parse(localStorage.getItem("scans")) || [];

    scans.push({
        ip: ip,
        url: url,
        status: status,
        attack: attack,
        risk: risk,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("scans", JSON.stringify(scans));
}

// Load history
function loadHistory() {

    let scans = JSON.parse(localStorage.getItem("scans")) || [];

    let table = document.getElementById("historyTable");

    table.innerHTML = "";

    scans.forEach(scan => {

        table.innerHTML += `
        <tr>
            <td>${scan.ip}</td>
            <td>${scan.url}</td>
            <td>${scan.status}</td>
            <td>${scan.attack}</td>
            <td>${scan.risk}%</td>
        </tr>
        `;
    });
}
