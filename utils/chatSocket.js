const chatSocket = (io) => {
  // Initialize arrays to hold user data and messages for each room
  let users = [];
  let allMsg = {};
  let activeRooms = new Set();
  
  io.on("connection", (socket) => {
    console.log("connect : ", socket.id);
  
    socket.on("enter", (data) => {
      const { username, room } = data; // Destructure username and room from data
      const userRoom = room || `${username}-admin`; // Use provided room or default to `${username}-admin`
      socket.join(userRoom);
      users.push({ id: socket.id, name: username, room: userRoom });
      allMsg[userRoom] = allMsg[userRoom] ? allMsg[userRoom] : [];
      activeRooms.add(userRoom);
      console.log(users);
      console.log(allMsg);
      io.to(userRoom).emit("getMessage", allMsg[userRoom]);
      io.emit("activeRooms", Array.from(activeRooms));

      
      
      // Send a welcome message when a user enters
      if (allMsg[room].length === 0) { // Only send if there are no messages yet
        const welcomeMessage = {
          id: "admin",
          username: "admin",
          msg: `สวัสดีครับ ${username}! วันนี้มีอะไรให้ทาง O2O Project ช่วยเหลือครับ?`,
        };
        allMsg[userRoom].push(welcomeMessage);
        io.to(userRoom).emit("getMessage", allMsg[userRoom]);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnect : ", socket.id);
      let idx = users.findIndex((el) => el.id === socket.id);
      if (idx !== -1) {
        let theRoom = users[idx].room;
        users.splice(idx, 1);
        let roomInUse = users.some((el) => el.room === theRoom);
        if (!roomInUse) {
          allMsg[theRoom] = [];
          activeRooms.delete(theRoom);
        }
        console.log("After disconnect");
        console.log(allMsg);
        console.log(users);
        io.emit("activeRooms", Array.from(activeRooms));
      }
    });
  
    socket.on("sendMessage", ({ username, msg, room }) => {
      allMsg[room].push({ id: socket.id, username, msg });
      io.to(room).emit("getMessage", allMsg[room]);
    });
  });
};

module.exports = chatSocket;
