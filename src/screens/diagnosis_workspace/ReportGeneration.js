import React, { useState, useEffect, useContext } from 'react'
import { Tabs, Tab, Table, Tooltip, Overlay, Collapse, Button, Form } from 'react-bootstrap'

import DataTable from '../../components/report_generator/DataTable'

import Img1 from '../../assets/graphs/img1.png'
import Img2 from '../../assets/graphs/img2.png'
import Img3 from '../../assets/graphs/img3.png'
import Img4 from '../../assets/graphs/img4.png'

import axios from 'axios'

const ReportGeneration = ({ segments }) => {

    const [seglist, setseglist] = useState(segments)

    const [note, setnote] = useState()
    const abnormality = ["crackle", "none", "wheeze"]
    const diagnosis = ["asthma", "bronchial", "copd", "healthy", "pneumonia"]
    const severity = ['asymptomatic', 'moderate manifestation', 'major manifestation', 'catastrophic manifestation']
    const severitycode = ['#84ff00', '#fff222', '#ff5e00', '#ff0000']

    const [activetab, setactivetab] = useState("Analysis")

    useEffect(() => {
        setseglist(segments)
    }, [segments])

    return (
        <div className='container'>
            <Tabs activeKey={activetab} onSelect={(k) => setactivetab(k)} id="report-generator" className="mb-3">
                <Tab eventKey="Analysis" title="Analysis">
                    <ul className='list-group'>
                        <li className='list-group-item active'>
                            <div className='row'>
                                <div className='col-3'>
                                    Segment details
                                </div>
                                <div className='col-9'>
                                    visualization
                                </div>
                            </div>
                        </li>
                        {
                            seglist.map((segment, index) => {
                                return <li key={index} className='list-group-item'>
                                    <div className='row'>
                                        <div className='col-3'>
                                            {/* Segment details */}
                                            <DataTable segment={segment}/>
                                        </div>
                                        <div className='col-9'>
                                            <Tabs defaultActiveKey="Analysis" id="uncontrolled-tab-example" className="mb-3">
                                                <Tab eventKey="Analysis" title="Analysis" style={{ minHeight: "250px" }}>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <img src={Img2} style={{ width: "400px" }} />
                                                        </div>
                                                        <div className='col-6'>
                                                            <img src={Img1} style={{ width: "400px" }} />
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="Waveform" title="Waveform" style={{ minHeight: "250px" }}>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <img src={Img3} style={{ width: "400px" }} />
                                                        </div>
                                                        <div className='col-6'>
                                                            <img src={Img4} style={{ width: "400px" }} />
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                    <div className='d-flex'>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("AutomatedDiagnosis") }}>Automated Diagnosis</div>
                        <div className='btn btn-primary m-1' onClick={() => { setactivetab("ManualDiagnosis") }}>Manual Diagnosis</div>
                    </div>
                </Tab>
                <Tab eventKey="AutomatedDiagnosis" title="Automated Diagnosis">
                    The system suggested diagnosis is as follows:
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Factor</th>
                                <th>Output</th>
                                <th>Probability</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Abnormality</td>
                                <td>Crackle</td>
                                <td>87% surity</td>
                            </tr>
                            <tr>
                                <td>Disorder</td>
                                <td>COPD</td>
                                <td>77% surity</td>
                            </tr>
                            <tr>
                                <td>Severity</td>
                                <td>Moderate manifestation</td>
                                <td>NA</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div>
                        <label>Add Note</label>
                        <br />
                        <textarea id="text-area" rows="4" cols="100" onChange={(e) => { setnote(e.target.value) }}></textarea>
                        <br />
                        <div className='btn btn-primary'>Report Preview</div>
                    </div>

                </Tab>
                <Tab eventKey="ManualDiagnosis" title="Manual Diagnosis">
                    <div id="manual-annotation">
                        <p className='bg-warning text-center p-1'>
                            The custom diagnosis data will be recorded and used to further improve the model. Wrong diagnosis will have catastrophic effects on future automated diagnosis
                        </p>
                        <ul className='list-group'>
                            <li className='list-group-item active'>
                                <div className='row'>
                                    <div className='col'>Segment Name</div>
                                    <div className='col'>Custom diagnosis</div>
                                </div>
                            </li>
                            {
                                seglist.map((segment, index) => {
                                    return <li key={index} className='list-group-item'>
                                        <div className='row'>
                                            <div className='col'>{segment.name}</div>
                                            <div className='col'>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <label className="form-label">Abnormality Detected *</label>
                                                        <Form.Select required>
                                                            {
                                                                abnormality.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                    <div className='col'>
                                                        <label className="form-label">Disorder *</label>
                                                        <Form.Select required>
                                                            {
                                                                diagnosis.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                    <div className='col'>
                                                        <label className="form-label">Severity *</label>
                                                        <Form.Select required>
                                                            {
                                                                severity.map((state, index) => {
                                                                    return <option key={index} value={index} >{state}</option>
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                        <br />
                        <div>
                            <label className="form-label">Mention Symptoms *</label>
                            <input
                                className="form-control"
                                type='text'
                                required={true}
                            ></input>
                        </div>
                        <br />
                        <div>
                            <label>Add Note *</label>
                            <br />
                            <textarea id="text-area" rows="4" cols="100" onChange={(e) => { setnote(e.target.value) }}></textarea>
                        </div>
                        <br />
                        <div className='btn btn-primary'>Report Preview</div>
                    </div>
                </Tab>
            </Tabs>
            <div style={{ height: "500px" }}>

            </div>

        </div>
    )
}

export default ReportGeneration
