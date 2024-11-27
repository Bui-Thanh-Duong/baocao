import express from "express"
const getContact = (req, res) => {
    return res.render("home", { data: { title: 'Page Contact',
        page:'contact', 
        name: 'Nguyễn Thị Ái Trân', 
        email: '21011259@gmail.com',
        phonenumber: '1234567890' } })
}
export default getContact