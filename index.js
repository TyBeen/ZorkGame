const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        readlineInterface.question(questionText, resolve);
    });
}
// Array of commands player can enter
let arrayOfCommands = ["help", "drop", "i", "take", "read", "open"];

// Start of game
async function start() {
    const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign. \n
>_`;
    let userInput;
    let answer = await ask(welcomeMessage);
    userInput = answer;
    let [command, item] = answer.toLowerCase().split(' ');
    if (!arrayOfCommands.includes(command)) {
        console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
    } else {
      // Switch statement for different commands player can enter
        switch (command) {
            case "read":
                console.log(`You read the ${item} and it says`);
                signFunc();
                break;
            case "drop":
                console.log(`You cannot drop the ${item}.`);
                break;
            case "take":
                console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                break;
            case "open":
                console.log(`You cannot open the ${item}.`);
                break;
        }
    }

// Loop for help command
    while (answer !== 'exit') {
        if (answer === "help") {
            console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items' \n 'left' \n 'right' \n 'forward' \n 'back'");
        } else if (answer === "i") {
            console.log("You are carrying: ")
            console.log(inventory.invItems)
        }
        answer = await ask('>_ ');
        [command, item] = answer.toLowerCase().split(' ');
        if (!arrayOfCommands.includes(command)) {
            console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
        } else {
          // Switch statement for different commands player can enter
            switch (command) {
                case "read":
                    console.log(`You read the ${item} and it says`);
                    signFunc();
                    break;
                case "drop":
                    console.log(`You cannot drop the ${item}.`);
                    break;
                case "take":
                    console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                    break;
                case "open":
                    console.log(`You cannot open the ${item}.`);
                    break;
            }
        }
    }

// Function for entering code to enter the first room
    async function signFunc() {
        console.log("The secret code for the door is 12345");
        let correctAnswer = false;
        while (!correctAnswer) {
            let userCode = await ask('Please enter the code. ');
            if (userCode === '12345') {
                console.log("Success! The door opens. \nYou enter the foyer and the door shuts behind you.");
                currentLocation = "foyer";
                console.log(locationList[currentLocation].description);
                firstRoom();
                correctAnswer = true;
            } else {
                console.log("Bzzzzt! The door is still locked. Please try again.");
            }
        }
    }

// First room Function
    async function firstRoom() {
        let currentRoom = arrayOfRooms.find(room => room.roomName === currentLocation);
        const firstRoomMessage = `You are standing on a carpet in a room. In front of you is a trap door.`;
        let answer = '';
        while (answer !== 'exit') {
            if (answer === "help") {
                console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items'");
            } else if (answer === "i") {
                console.log("You are carrying: ")
                console.log(inventory.invItems)
            }
            answer = await ask('>_ ');
            let [command, item] = answer.toLowerCase().split(' ');
            if (!arrayOfCommands.includes(command)) {
                console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
            } else {
              // Switch statement for different commands player can enter
                switch (command) {
                    case "read":
                        let index = currentRoom.roomItems.indexOf(item);
                            let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                            inventory.invItems.push(takenItem);
                            if (item === "painting") {
                                console.log("There is a key behind the painting.")
                            } else {
                                console.log(`You cannot read the ${item}.`)
                            }
                        break;
                    case "drop":
                        if (inventory.invItems.includes(item)) {
                            let index = inventory.invItems.indexOf(item);
                            let droppedItem = inventory.invItems.splice(index, 1)[0];
                            console.log(`You drop the ${droppedItem}.`);
                        } else {
                            console.log(`You do not have ${item} in your backapck to drop.`);
                        }
                        break;
                    case "take":
                        if (currentRoom && currentRoom.roomItems.includes(item)) {
                            let index = currentRoom.roomItems.indexOf(item);
                            let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                            inventory.invItems.push(takenItem);
                            console.log(`You take the ${item} and add it to your inventory.`);
                            if (item === "painting") {
                                console.log("There is a key behind the painting.")
                            } else if (inventory.invItems.includes("key")) {
                                console.log("You have a key to the locked door");
                            } else {
                                console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                            }
                        } else {
                            console.log(`There is no ${item} in this room.`);
                        }
                        break;
                        case "open":
                            if (item === "door" && inventory.invItems.includes("key")) {
                                console.log("You open the door and walk in");
                                currentLocation = "attic";
                                console.log(locationList[currentLocation].description)
                                attic();
                            } else {
                                console.log(`You cannot open this ${item}.`);
                            }
                            break;
                    }
            }
        }
    }

// Second Room Function
    async function attic() {
        let currentRoom = arrayOfRooms.find(room => room.roomName === currentLocation);
        let answer = '';
        while (answer !== 'exit') {
            if (answer === "help") {
                console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items'");
            } else if (answer === "i") {
                console.log("You are carrying: ")
                console.log(inventory.invItems)
            }
            answer = await ask('>_ ');
            let [command, item] = answer.toLowerCase().split(' ');
            if (!arrayOfCommands.includes(command)) {
                console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
            } else {
              // Switch statement for different commands player can enter
                switch (command) {
                    case "read":
                        let index = currentRoom.roomItems.indexOf(item);
                        let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                        if (item === "note") {
                            console.log(`You read the ${item} and it says the trapdoor is voice activated please say(type) "i love coding" and it will open.`);
                            while (true) {
                                answer = await ask('>_ ');
                                if (answer === "i love coding") {
                                    console.log("The trapdoor opens and you fall in.")
                                    currentLocation = "library";
                                    console.log(locationList[currentLocation].description)
                                    library()
                                    break;
                                } else {
                                    console.log("That is the incorrect phrase please try again")
                                }
                            }
                        }
                        break;
                    case "drop":
                        if (inventory.invItems.includes(item)) {
                            let index = inventory.invItems.indexOf(item);
                            let droppedItem = inventory.invItems.splice(index, 1)[0];
                            console.log(`You drop the ${droppedItem}.`);
                        } else {
                            console.log(`You do not have ${item} in your backpack to drop.`);
                        }
                        break;
                    case "take":
                        if (currentRoom && currentRoom.roomItems && currentRoom.roomItems.includes(item)) {
                            let index = currentRoom.roomItems.indexOf(item);
                            let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                            inventory.invItems.push(takenItem);
                            console.log(`You take the ${item} and add it to your inventory.`);
                            if (item === "carpet") {
                                console.log("There is a trapdoor with a note on top of it.")
                            } else {
                                console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                            }
                        } else {
                            console.log(`There is no ${item} in this room.`);
                        }
                        break;
                    case "open":
                        console.log(`You cannot open the ${item}.`)
                        break;
                }
            }
        }
    }

// Third Room Function
    async function library() {
        let currentRoom = arrayOfRooms.find(room => room.roomName === currentLocation);
        let answer = '';
        while (answer !== 'exit') {
            if (answer === "help") {
                console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items'");
            } else if (answer === "i") {
                console.log("You are carrying: ")
                console.log(inventory.invItems)
            }
            answer = await ask('>_ ');
            let [command, item] = answer.toLowerCase().split(' ');
            if (!arrayOfCommands.includes(command)) {
                console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
            } else {
              // Switch statement for different commands player can enter
                switch (command) {
                    case "read":
                        let index = currentRoom.roomItems.indexOf(item);
                        let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                        if (item === "notebook") {
                            console.log(`You read the ${item} and it says if you take the correct book from the bookshelf something mysterious will happen.`);
                        } else {
                            console.log(`You cannot read the ${item}`)
                        }
                        break;
                    case "drop":
                        if (inventory.invItems.includes(item)) {
                            let index = inventory.invItems.indexOf(item);
                            let droppedItem = inventory.invItems.splice(index, 1)[0];
                            console.log(`You drop the ${droppedItem}.`);
                        } else {
                            console.log(`You do not have ${item} in your backpack to drop.`);
                        }
                        break;
                    case "take":
                        if (item === "notebook") {
                            inventory.invItems.push(item);
                            console.log(`You take the ${item} and have the urge to read it.`);
                        } else if (item === "blue_book" && inventory.invItems.includes("notebook")) {
                            inventory.invItems.push(item);
                            console.log("The bookshelf moves and reveals a hidden door behind.");
                        } else {
                            console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                        }
                        break;
                    case "open":
                        if (item === "door" && inventory.invItems.includes("blue_book")) {
                            console.log("You open the door and walk in.")
                            currentLocation = "theater"
                            console.log(locationList[currentLocation].description)
                            theater();
                        } else {
                            console.log(`You cannot open the ${item}.`)
                        }
                        break;
                }
            }
        }
    }


// Fourth Room Function
    async function theater() {
        let currentRoom = arrayOfRooms.find(room => room.roomName === currentLocation);
        let answer = '';
        while (answer !== 'exit') {
            if (answer === "help") {
                console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items'");
            } else if (answer === "i") {
                console.log("You are carrying: ")
                console.log(inventory.invItems)
            }
            answer = await ask('>_ ');
            let [command, item] = answer.toLowerCase().split(' ');
            if (!arrayOfCommands.includes(command)) {
                console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
            } else {
              // Switch statement for different commands player can enter
                switch (command) {
                    case "read":
                        console.log(`You cannot read the ${item}.`)
                        break;
                    case "drop":
                        if (inventory.invItems.includes(item)) {
                            let index = inventory.invItems.indexOf(item);
                            let droppedItem = inventory.invItems.splice(index, 1)[0];
                            console.log(`You drop the ${droppedItem}.`);
                        } else {
                            console.log(`You do not have ${item} in your backpack to drop.`);
                        }
                        break;
                    case "take":
                        if (currentRoom && currentRoom.roomItems.includes(item)) {
                            let index = currentRoom.roomItems.indexOf(item);
                            let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                            inventory.invItems.push(takenItem);
                            if (item === "radio") {
                                console.log("You take the radio and shake it. There seems to be a rattle coming from it. Maybe there is something in it?")
                            } else if (item === "theater_key" && inventory.invItems.includes("radio")) {
                                console.log("You take the theater_key and are now able to open the locked door.")
                            } else {
                                console.log(`You take the ${item} and add it to your backpack.`);
                            }
                        } else {
                            console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                        }
                        break;
                    case "open":
                        if (item === "radio") {
                            console.log("You smash the radio on the ground and see a theater_key in the pieces of the radio.")
                        } else if (item === "door" && inventory.invItems.includes("theater_key")) {
                            console.log ("You open the door and walk in.")
                            currentLocation = "basement"
                            console.log(locationList[currentLocation].description)
                            basement();
                        } else {
                            console.log(`You cannot open the ${item}.`)
                        }
                        break;
                }
            }
        }
    }


// Fifth Room Function
    async function basement() {
        let currentRoom = arrayOfRooms.find(room => room.roomName === currentLocation);
        let answer = '';
        while (answer !== 'exit') {
            if (answer === "help") {
                console.log("Here are the list of commands. \n 'help - lists available commands' \n 'drop - drops item that user specifies from inventory' \n 'i - shows users inventory' \n 'take - takes specific item from room and adds it to players inventory' \n 'read - reads specific items' \n 'open - opens specific items'");
            } else if (answer === "i") {
                console.log("You are carrying: ")
                console.log(inventory.invItems)
            }
            answer = await ask('>_ ');
            let [command, item] = answer.toLowerCase().split(' ');
            if (!arrayOfCommands.includes(command)) {
                console.log(`I don't know how to ${answer}. Type "help" for a list of commands.`);
            } else {
              // Switch statement for different commands player can enter
                switch (command) {
                    case "read":
                        console.log(`I do not know how to read the ${item}.`)
                        break;
                    case "drop":
                        if (inventory.invItems.includes(item)) {
                            let index = inventory.invItems.indexOf(item);
                            let droppedItem = inventory.invItems.splice(index, 1)[0];
                            console.log(`You drop the ${droppedItem}.`);
                        } else {
                            console.log(`You do not have ${item} in your backpack to drop.`);
                        }
                        break;
                    case "take":
                        if (currentRoom && currentRoom.roomItems.includes(item)) {
                            let index = currentRoom.roomItems.indexOf(item);
                            let takenItem = currentRoom.roomItems.splice(index, 1)[0];
                            inventory.invItems.push(takenItem);
                            if (item === "doll") {
                                console.log("You take the doll and get possesed by a demon and smash the couch with your new found strength and rage. You notice a cellar_key was in the rubble.")
                            } else if (item === "cellar_key") {
                                console.log("You take the theater_key and are now able to open the locked door.")
                            } else {
                                console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                            }
                        } else {
                            console.log(`You cannot take the ${item} you are too weak and need to hit the gym.`);
                        }
                        break;
                    case "open":
                        if (item === "door" && inventory.invItems.includes("cellar_key")) {
                            console.log ("You open the door and walk in.")
                            end();
                        } else {
                            console.log(`You cannot open the ${item}.`)
                        }
                        break;
                }
            }
        }
    }

// Function for the end game message
    async function end() {
        console.log("CONGRATS YOU WON THE GAME!")
        process.exit();
    }

    process.exit();
    }    


class Location {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}


// Room names and descriptions
let room1 = new Location(`starting room`, `You are in the first room`);
let room2 = new Location(`foyer`, `You are in the foyer. The first thing you notice is you are standing on a mat. There is a painting on the left wall, a dresser against the right wall and a door at the very end of the room.`);
let room3 = new Location(`attic`, `You are in the attic. You notice you are standing on a carpet. There is a rocking chair in the corner covered in cobwebs, an old tv on the left wall, and dusty boxes on the right wall.`);
let room4 = new Location(`library`, `You are in library. You see that there is a bookshelf with 4 books on it. There is a green_book, and red_book, a blue_book, and a yellow_book. A table with a lamp, and a notebook on it on the left wall, and a chair in the corner.`);
let room5 = new Location(`theater`, `You are in the theater room. There is a table with a radio on it, 4 rows of movie chairs infront of a giant tv and a door that seems to be locked.`);
let room6 = new Location(`basement`, `You are in the basement. There is a couch on the left wall with a creepy doll sitting on it looking right into your eyes, an old broken lamp in the corner and a cellar door that seems to be locked.`);


// Object for Room names
let locationList = {
    'starting room': room1,
    'foyer': room2,
    'attic': room3,
    'library': room4,
    'theater': room5,
    'basement': room6
};

let currentLocation = "starting room";

let inventory = {
    invItems: []
};

// Array of room objects and their inventories

let arrayOfRooms = [
    {
        roomName: 'starting room',
        roomNonItems: Object.freeze({
            startingRoomNonMovableItems: Object.freeze(['Door', 'Sign', 'Carpet'])
        })
    },
    {
        roomName: 'foyer',
        roomItems: ['painting', 'key'],
        roomNonItems: Object.freeze({
            foyerRoomNonMovableItems: Object.freeze(['mat', 'door'])
        })
    },
    {
        roomName: `attic`,
        roomItems: [`carpet`],
        roomNonItems: Object.freeze({
            atticRoomNonMovableItems: Object.freeze(["dusty boxes", "cobwebs", "rocking chair", "old tv", "note"])
        })
    },
    {
        roomName: `library`,
        roomItems: [`blue_book`, "notebook"],
        roomNonItems: Object.freeze({
            libraryRoomNonMovableItems: Object.freeze(["bookshelf", "table", "lamp", "red_book", "green_book", "yellow_book"])
        })
    },
    {
        roomName: `theater`,
        roomItems: [`radio`, "theater_key"],
        roomNonItems: Object.freeze({
            theaterRoomNonMovableItems: Object.freeze(["giant tv", "movie chairs", "door"])
        })
    },
    {
        roomName: `basement`,
        roomItems: [`cellar_key`, "doll"],
        roomNonItems: Object.freeze({
            basementRoomNonMovableItems: Object.freeze(["couch", "lamp", "door"])
        })
    }
];

start();