const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = 3221;

app.use(express.json());

app.get('/resort', (_req, res) => {
    res.status(200).json({
        message: 'The server is up and running! Let\'s test this again adsfds'
    });
});

 
// guest 
app.post('/resort/guest', async (req, res) => {
    const { name, email, password, phone, address,createdDate, fid, bid } = req.body;

    const createdGuest = await prisma.guest.create({
        data: {
            name,
            email,
            password,
            phone,
            address,
            createdDate,
            fid,
            bid
            
        }
    });

    res.status(201).json(createdGuest);
});

app.get('/resort/guest', async (req, res) => {
    const allGuests = await prisma.guest.findMany({
        include:{
            bookings:true
        }
    })
    console.log(allGuests)
    res.status(200).json(allGuests);
});

app.get('/resort/guest/:id', async(req,res) => {
    const {id} = req.params
    const getguestByid = await prisma.guest.findUnique({
        where:{
            id:id
        }
    })
    res.status(201).json(getguestByid);
})

app.patch('/resort/guest/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Password, Phone, Address, createdDate, fid, bid } = req.body;

        const updatedGuest = await prisma.guest.update({
            where: {
                id: id,
            },
            data: {
                Name,
                Email,
                Password,
                Phone,
                Address,
                createdDate,
                fid,
                bid
            }
        });

        res.status(200).json(updatedGuest);
});

app.delete('/resort/guest/:id', async (req, res) => {
    const { id } = req.params;

    const deletedGuest = await prisma.guest.delete({
        where: {
            id: id,
        },
    });

    if (deletedGuest) {
        res.status(200).json(deletedGuest);
    }
});


// Rooms
app.post('/resort/room', async (req, res) => {
    const { roomNo, roomType, capacity, price } = req.body;

    const createdRoom = await prisma.room.create({
        data: {
            roomNo,
            roomType,
            capacity,
            price,
        },
    });
    res.status(201).json(createdRoom);
});

app.get('/resort/room', async (req, res) => {
    const allRooms = await prisma.room.findMany({
        include:{
            bookings:true
        }
    });

    res.status(200).json(allRooms);
});

app.get('/resort/room/:id', async(req,res) => {
    const {id} = req.params
    const getroomByid = await prisma.room.findUnique({
        where:{
            id:id
        }
    })
    res.status(201).json(getroomByid);
})

app.patch('resort/room/:id', async(req,res) =>{
    const {id} = req.params
    const { roomNo, roomType, capacity, price } = req.body;
    const modifyroomByid =await prisma.room.update({
        where:{
            id:id
        },
        data:{
            roomNo,
            roomType,
            capacity,
            price
        }
    })
    res.status(201).json(modifyroomByid)
})

app.put('/resort/room/:id', async (req, res) => {
    const { id } = req.params;
    const { roomNo, roomType, capacity, price } = req.body;
    const updatedRoom = await prisma.room.update({
        where: {
            id: id,
        },
        data: {
            roomNo,
            roomType,
            capacity,
            price,
        },
    });
        res.status(200).json(updatedRoom); 
});

app.delete('/resort/room/:id',async(req,res)=>{
    const{id}= req.params
    const deleteRoomById= await prisma.room.delete({
        where:{
            id:id
        }
    })
    res.status(201).json(deleteRoomById)
})


//booking
app.post('/resort/booking', async (req, res) => {

    const { gid, rid, checkInDate, checkOutDate } = req.body;

    const createdBooking = await prisma.booking.create({
        data: {
            gid,
            rid,
            checkInDate,
            checkOutDate,
        }
    });
    res.status(201).json(createdBooking);
});

app.get('/resort/booking', async (req, res) => {
    const allBooking = await prisma.booking.findMany();

    res.status(200).json(allBooking);
});

app.get('/resort/booking/:id', async(req,res) => {
    const {id} = req.params
    const getbookingByid = await prisma.booking.findUnique({
        where:{
            id:id
        }
    })
    res.status(201).json(getbookingByid);
})

app.patch('/resort/booking/:id',async(req,res)=>{
    const {id} = req.params
    const { Gid, Rid, checkInDate, checkOutDate } = req.body;
    const modifybookigByid= await prisma.booking.update({
        where:{
            id:id
        }
    })
    res.status(201).json(modifybookigByid)
})


//faciltiy
app.post('/resort/facility', async(req,res) => {
    const { name, description} = req.body

    const createdFacility = await prisma.facility.create({
        data:{
            name,
            description
        }
    })

    res.status(201).json(createdFacility);
})

app.get('/resort/facility', async(req,res) => {
    const allfacility= await prisma.facility.findMany()

    res.status(201).json(allfacility);
})

app.get('/resort/facility/:id', async(req,res) => {
    const {id} = req.params
    const getfacilityByid = await prisma.facility.findUnique({
        where:{
            id:id
        }
    })
    res.status(201).json(getfacilityByid);
})

//facilitiesGuest

app.post('/resort/facilitiesGuest',async(req,res) =>{
    const {fid, gid}=req.body
    const createfacilityGuest = await prisma.facilitiesGuest.create({
        data:{
            fid,
            gid
        }
    })
    res.status(201).json(createfacilityGuest)
})

app.get('/resort/facilitiesGuest',async(req,res)=>{
    const getallfacilitiesGuest=await prisma.facilitiesGuest.findMany()

    res.status(201).json(getallfacilitiesGuest)
})

app.get('/resort/facilitiesGuest/:id', async(req,res) => {
    const {id} = req.params
    const getfacilityGuestByid = await prisma.facilitiesGuest.findUnique({
        where:{
            id:id
        }
    })
    res.status(201).json(getfacilityByid);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
