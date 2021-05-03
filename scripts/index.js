const postsDiv = document.querySelector("#posts");

let tableHeaders = ["Title", "Author", "Date"]

const createTable = () => {

    while (postsDiv.firstChild) postsDiv.removeChild(postsDiv.firstChild);

    let postsTable = document.createElement("table");
    postsTable.className = "postsTable";

    let postsTableHead = document.createElement("thead");
    postsTableHead.className = "postsTableHead";

    let postsTableHeaderRow = document.createElement("tr");
    postsTableHeaderRow.className = "postsTableHeaderRow";

    tableHeaders.forEach(header => {
        let postsHeader = document.createElement("th");
        postsHeader.innerText = header;
        postsTableHeaderRow.append(postsHeader);
    })

    postsTableHead.append(postsTableHeaderRow);
    postsTable.append(postsTableHead);

    let postsTableBody = document.createElement("tbody");
    postsTableBody.className = "postsTable-Body";
    postsTable.append(postsTableBody);

    postsDiv.append(postsTable);
}

const appendPosts = (post) => {

    const postsTable = document.querySelector(".postsTable");

    let postsTableBodyRow = document.createElement("tr");
    postsTableBodyRow.className = "postsTableBodyRow";

    let postTitle = document.createElement("td");
    postTitle.innerText = post.title;

    let postAuthor = document.createElement("td");
    postAuthor.innerText = post.owner.display_name;

    let postDate = document.createElement("td");
    postDate.innerText = new Date(post.creation_date * 1000).toGMTString();

    postsTableBodyRow.append(postTitle, postAuthor, postDate);

    postsTable.append(postsTableBodyRow);
}

async function getPosts() {
    try {
        const response = await fetch("https://api.stackexchange.com/2.2/questions?page=1&pagesize=20&order=desc&sort=activity&site=stackoverflow");
        const data = await response.json();
        const {items} = data;

        createTable();

        for (let post of items) {
            appendPosts(post);
        }
    } catch(err) {
        console.error("Failed to fetch data");
    }
}

getPosts();



