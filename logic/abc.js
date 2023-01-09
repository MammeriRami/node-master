const mongoose = require('mongoose');
const Project = require("../models/project");
var nodemailer = require('nodemailer');
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('node:path');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rami.mammeri@univ-constantine2.dz',
        pass: 'MassilBEN2003'
    }
});

let Options = {
   
};


module.exports = {

    getProject: async (req, res, next) => {
        // res.send("hello world")
        Project.find()
            .then((result) => {

                res.json({
                    ress: result.map(res => {
                        return {
                            pn: res.PN,
                            y: res.Y,
                            fs: res.FS,
                            fe: res.FE,
                            ss: res.SS,
                            se: res.SE,
                            ts: res.TS,
                            te: res.TE,
                            sv: res.SV.FN,
                            pr: res.PR.FN,
                            ex: res.EX.FN,
                            viva: res.VIVA,

                            id: res._id
                        }
                    })
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },

    getProjectbyid: async (req, res, next) => {
        // res.send("hello world")
        Project.findById(req.params.id)
            .then((result) => {

                res.json({
                    ress: {
                        pn: result.PN,
                        y: result.Y,
                        fs: result.FS,
                        fe: result.FS,
                        ss: result.SS,
                        se: result.SE,
                        ts: result.TS,
                        te: result.TE,
                        viva: result.VIVA,

                        id: result._id
                    }


                })
            })
            .catch((err) => {
                console.log(err);
            });
    },

    postProject: async (req, res) => {
       
        
    


        const project = new Project();
        project.PN = req.body.PN;
        project.Y = req.body.Y;
        project.FS = req.body.FS;
        project.FE = req.body.FE;
        project.SS = req.body.SS;
        project.SE = req.body.SE;
        project.TS = req.body.TS;
        project.TE = req.body.TE;
        project.SV.FN = req.body.SVN;
        project.PR.FN = req.body.PRN;
        project.EX.FN = req.body.EXN;
        project.SV.MARK = req.body.SVM;
        project.PR.MARK = req.body.PRM;
        project.EX.MARK = req.body.EXM;
        project.VIVA = (0.3 * project.SV.MARK) + (0.3 * project.PR.MARK) + (0.4 * project.EX.MARK);

        await project.save()
            .then((result) => {
                ejs.renderFile(
                    path.join("./view/", "pdfG.ejs"),{
                        user:result,
                    },
                    (err, data) => {
                        if (err) {
                            res.send("first");
                        } else {
                            pdf.create(data, Options).toFile("VIVA.pdf", function (err, data) {
                                if (err) {
                                    res.send("SECOND");
                                } else {
                                    var mailOptions1 = {
                                        from: 'rami.mammeri@univ-constantine2.dz',
                                        to: result.FE,                                       
                                        
                                        subject: 'viva ',
                                        text: `hii `+result.FS+ `We are sending you this email to inform you about the last desision concerning your project :`+result.PN+`
                                        and you got the following mark `+result.SV.MARK+` `+ result.PR.MARK+ ` ` + result.EX.MARK+` and for the viva you got this `+ result.VIVA,
                                        attachments: [
                                            {
                                                path: data.filename
                                            },                                          
                                        ],                                     
                                    };
                                    transporter.sendMail(mailOptions1, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.send(result.FE)
                                        } else {
                                            res.send("cbn");
                                            console.log('Email sent: ' + info.response);
                                        }
                                    
                                    });
                                    var mailOptions2 = {
                                        from: 'rami.mammeri@univ-constantine2.dz',
                                        to:result.SE,
                                        
                                        subject: 'viva ',
                                        text: `hii `+result.SS+ `We are sending you this email to inform you about the last desision concerning your project :`+result.PN+`
                                        and you got the following mark `+result.SV.MARK+` `+ result.PR.MARK+ ` ` + result.EX.MARK+` and for the viva you got this `+ result.VIVA,
                                        attachments: [
                                            {
                                                path: data.filename
                                            },                                          
                                        ],                                     
                                    };
                                    transporter.sendMail(mailOptions2, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.send(9ble cbn)
                                        } else {
                                            res.send("cbn");
                                            console.log('Email sent: ' + info.response);
                                        }
                                    
                                    });
                                    var mailOptions3 = {
                                        from: 'rami.mammeri@univ-constantine2.dz',
                                        
                                        to:result.TE,
                                        
                                        subject: 'viva ',
                                        text: `hii `+result.TS+ `We are sending you this email to inform you about the last desision concerning your project :`+result.PN+`
                                        and you got the following mark `+result.SV.MARK+` `+ result.PR.MARK+ ` ` + result.EX.MARK+` and for the viva you got this `+ result.VIVA,
                                        attachments: [
                                            {
                                                path: data.filename
                                            },                                          
                                        ],                                     
                                    };
                                    transporter.sendMail(mailOptions3, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.send(result.FE)
                                        } else {
                                            res.send("cbn");
                                            console.log('Email sent: ' + info.response);
                                        }
                                    
                                    });

  
                                }
                            });
                        }
                    });                  
            })
            .catch((err) => {
                console.log(err);
            })

        


    },

    deleteProject: (req, res) => {
        const id = req.params.id;
        const del = Project.findByIdAndDelete(id)
            .then((result) => {
                res.json({ "delete": del });
            }

            )
            .catch((e) => {
                console.log(e);
            })
    }

}
