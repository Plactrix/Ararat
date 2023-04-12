"use client";
import { useState } from "react";
import {Button, Dialog, DialogContent, DialogTitle, Divider, Typography, Grid, TextField, DialogActions} from "../../../components/base";
import createImageServer from "../../../scripts/api/v1/image_servers/create";
import { useRouter } from "next/navigation";

export default function CreateImageBuilder() {
    const [creatingImageBuilder, setCreatingImageBuilder] = useState(false);
    const [imageServerUrl, setImageServerUrl] = useState("");
    const [imageServerName, setImageServerName] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    return (
        <>
                <Button onClick={() => setCreatingImageBuilder(true)} variant="contained" sx={{ml: "auto"}}>Create Image Builder</Button>
                <Dialog open={creatingImageBuilder} fullWidth={true} onClose={() => {
                    if (!(currentStep > 0)) {
                        setCreatingImageBuilder(false);
                    }
                }}>
                    <DialogTitle>
                    <Typography variant="h6" align="center" fontFamily="Poppins" fontWeight="bold">Create Image Builder</Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {currentStep == 0 ? 
                                <>
                <Typography fontWeight="bold" fontSize={18} align="center" sx={{mb: 2}}>Please input the URL of the image server you would like to add</Typography>
                <TextField value={imageServerUrl} onChange={(e) => setImageServerUrl(e.target.value)} placeholder="Image Server URL" variant="standard" fullWidth={true} />
                <TextField value={imageServerName} onChange={(e) => setImageServerName(e.target.value)} placeholder="Image Server Name" variant="standard" fullWidth={true} />
                                </>
                             : ""}
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                    <Button onClick={() => setCreatingImageBuilder(false)} variant="contained" color="error">Cancel</Button>
                        <Button onClick={async () => {
                            await createImageServer(imageServerUrl, imageServerName);
                            setCreatingImageBuilder(false);
                            setTimeout(() => {
                                window.location.reload();
                            }, 100)
}} variant="contained" color="success">Create</Button>
                    </DialogActions>

                </Dialog>
        </>
    )
}