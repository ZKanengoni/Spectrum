<script>
	import * as faceapi from 'face-api.js';
	import { onMount } from 'svelte';

	$: video = {};
	$: btnTry = {};
	// let btnAgain = {};

	const MODEL_URL = 'models';

	const emotions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised', 'fearful'];

	onMount(() => {
		video = document.getElementById('video');
		btnTry = document.querySelector('.try');
		// btnAgain = document.querySelector('.again');

		const loadModels = async () => {
			Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
				faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
				faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
				faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
			]).then(startVideo);
		};

		loadModels();

		const getDetection = () => {
			setInterval(async () => {
				const detection = await faceapi
					.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				if (detection.length > 0) {
					console.log(detection[0].expressions);
				}
			}, 1000);
		};

		btnTry.addEventListener('click', getDetection);
	});

	function startVideo() {
		navigator.mediaDevices.getUserMedia({ video: {} }).then(
			(stream) => {
				video.srcObject = stream;
			},
			(err) => console.error(err)
		);
	}
</script>

<div class="card__container">
	<div class="video__container">
		<video id="video" autoplay muted />
	</div>
	<div class="info-section">
		<div class="prompt__section">
			<p class="results" />
		</div>
		<div class="button__section">
			<div class="btn try"><p>match</p></div>
			<div class="btn again"><p>retry</p></div>
		</div>
	</div>
</div>
<div class="backcard" />
<div class="backcard smallest" />

<style>
	.card__container {
		width: 85%;
		height: 22rem;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 999;
	}

	.video__container {
		width: 190px;
		height: 190px;
		display: flex;
		justify-content: center;
		margin: 2rem auto 0;
		border-radius: 50%;
		/* border: 2.5px solid var(--card-border); */
		overflow: hidden;
		-webkit-transform: translateZ(0);
	}

	video {
		width: 390px;
		height: 200px;
		/* margin: rem 0; */
	}

	.backcard {
		width: 75%;
		height: 22rem;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		margin: 0 auto;
		position: relative;
		z-index: 2;
		bottom: 21rem;
	}

	.smallest {
		width: 65%;
		z-index: 1;
		bottom: 42rem;
	}

	.info-section {
		width: 100%;
		height: calc(100% - 190px - 4rem);
	}

	.prompt__section {
		width: 100%;
		height: 2rem;
		display: flex;
		justify-content: center;
	}

	.prompt__section p {
		margin: 12px 0 0 0;
		font-size: 1.23em;
	}

	.button__section {
		width: 100%;
		height: 50%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		/* border-top: 2px solid var(--card-border); */
		padding: 1.3rem 0;
	}

	.btn {
		width: 110px;
		height: 35px;
		border: 2.5px solid var(--card-border);
		border-radius: 50px;
		text-align: center;
		font-size: 18px;
		cursor: pointer;
	}

	.btn p {
		margin: 0.35rem 0;
	}

	.try {
		background-color: var(--main-orange);
	}

	.again {
		background-color: var(--main-blue);
	}
</style>
