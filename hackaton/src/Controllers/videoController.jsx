import { constraints } from '@tensorflow/tfjs'
import React, { useEffect } from 'react'

const VideoController = () => {


    useEffect( () => {
        playVideoFromCamera() ;
    })

    const openMediaDevices = async (constraints) => {
        try {
            const mediaDevices = await navigator.mediaDevices.getUserMedia(constraints);
            return mediaDevices;
        } catch (error) {
            console.log("Error open media devices => ", error)
        }
    }


    const getMediaStream = () => {
            const stream = openMediaDevices({'video': true, 'audi': false});
            console.log('Got stram => ',stream);
            return stream;
    }
    

    const choiceConnectedDevices = async (type) => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            return devices.filter(device => device.kind === type);
        } catch (error) {
            console.log("error get choice devices => ", error)
        }
    }


    const getConnectedDeviuces = () => {
        const videoCameras = getConnectedDeviuces('videoinput');
        console.log('Cameras found: ', videoCameras);
        return videoCameras ;
    }

    const playVideoFromCamera = async () => {
        try {
            const stream = await  getMediaStream()
            const video = document.getElementById('localVideo');
            video.srcObject = stream;
        } catch (error) {
            console.log("Error opening video camera. ", error);
        }
    }

 



  return (
    <video id="localVideo" autoPlay playsInline controls={true}/>
  )
}

export default VideoController