/*  content.js
 *
 *  Content script 
 *
 *
 */

function handleLogItems(mutationList, observer) {
    mutationList.forEach( (mutation) => {
        switch(mutation.type) {
            // All the Game Log items appear in this
            case 'childList':
                let nodes = mutation.addedNodes;
                nodes.forEach( (node) => {
                    console.log(node.innerText)
                });
                break;
            case 'attributes':
                break;
            case 'subtree':
                break;
        }
    });
}

// credits to Yong Wang @ https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            attributes: true,
            subtree: true
        });
    });
}

function observeRightSidebar() {
    const observer = new MutationObserver(handleLogItems);
    const target = document.querySelector(".w-drawer-md-full");
    const settings = {childList: true};
    observer.observe(target, settings);
}

let target = waitForElm(".w-drawer-md-full").then((elm) => {
    console.log("Right sidebar found");
    observeRightSidebar();
});

