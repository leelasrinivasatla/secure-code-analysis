document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    fetch("/analyze", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const output = document.getElementById("output");
        output.innerHTML = "";

        for (const [vulnType, files] of Object.entries(data)) {
            const section = document.createElement("div");
            section.classList.add("vulnerability");

            const header = document.createElement("h3");
            header.textContent = vulnType;
            section.appendChild(header);

            if (files.length > 0) {
                const list = document.createElement("ul");
                files.forEach(file => {
                    const item = document.createElement("li");
                    item.textContent = file;
                    list.appendChild(item);
                });
                section.appendChild(list);
            } else {
                const noIssues = document.createElement("p");
                noIssues.textContent = "No issues found";
                section.appendChild(noIssues);
            }
            output.appendChild(section);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});
