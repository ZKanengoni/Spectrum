<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isLoading, expressionItems } from '$lib/stores';
	import Timer from 'easytimer.js';
	import * as faceapi from 'face-api.js';

	$: video = {};
	$: btnTry = {};
	$: outputLabel = {};
	$: progressBar = {};
	$: error = false;

	let expressionResults = [];
	let questionNumber = 1;
	let errorMessages = '';

	const timer = new Timer();

	const MODEL_URL = 'models';
	const emotions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised'];

	let randomEmotion = emotions[Math.floor(Math.random() * 5)];

	onMount(() => {
		video = document.getElementById('video');
		btnTry = document.querySelector('.try');
		outputLabel = document.querySelector('.results');
		progressBar = document.querySelector('.progress');

		console.log(randomEmotion);

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
			expressionResults = [];

			timer.start({
				countdown: true,
				startValues: {
					seconds: 5
				}
			});

			timer.addEventListener('secondsUpdated', (e) => {
				outputLabel.innerText = timer.getTimeValues();
			});

			timer.addEventListener('targetAchieved', async () => {
				outputLabel.innerText = 'Analyzing...';

				const detection = await faceapi
					.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				if (detection.length > 0) {
					expressionResults[0] = detection[0].expressions;

					console.log(expressionResults);
					checkAnswer(detection[0].expressions);
				}
			});
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

	function checkAnswer(detections) {
		outputLabel.innerText = '';

		if (detections[randomEmotion] >= 0.5) {
			errorMessages = 'Well done!';
			nextQuestion();
		} else {
			errorMessages = 'Sorry, try again.';
			showError();
		}
	}

	function nextQuestion() {
		if (questionNumber < 6) {
			$expressionItems = [...$expressionItems, randomEmotion];

			randomEmotion = emotions[Math.floor(Math.random() * 7)];
			progressBar.style.width = `${(questionNumber / 5) * 100}%`;

			++questionNumber;

			showError();

			if (expressionResults.length == 5) goto('/games');
		}
	}

	function showError() {
		error = true;

		setTimeout(() => {
			error = false;
			errorMessages = '';
		}, 4000);
	}
</script>

<div class="nav__container">
	<div
		class="btn-back"
		on:click={() => {
			location.href = '/games';
		}}
	>
		<i class="fi fi-rr-arrow-small-left" />
	</div>

	<div class="alert" class:isVisible={error}>
		<p>{errorMessages}</p>
	</div>
</div>

<div class="heading">
	<p>Match the expressions</p>
</div>

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
		</div>
	</div>
</div>

<div class="question__container">
	<div class="progress__container">
		<div class="progress-bar">
			<div class="progress" />
		</div>
	</div>

	<div class="question__section">
		<p>{randomEmotion}</p>
	</div>
</div>

<style>
	.nav__container {
		width: 100%;
		height: 4rem;
		display: flex;
		flex-direction: row;
		margin: 0 0 0.5rem 0;
	}

	.nav__container p {
		font-size: 21.5px;
		margin-left: 0.9rem;
		margin-top: 0.8rem;
	}

	.question__container {
		width: 80%;
		height: 6.5rem;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		margin: 2rem auto;
	}

	.card__container {
		width: 80%;
		height: 22rem;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		margin: 1rem auto 0;
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
		/* -webkit-transform: translateZ(0); */
	}

	video {
		width: 390px;
		height: 200px;
		/* margin: rem 0; */
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
		padding: 1.3rem 0;
	}

	.btn {
		width: 80%;
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

	.btn-back {
		width: 40.5px;
		height: 40.5px;
		margin: 0 2.5rem 2rem;
		margin-right: 0;
		border-radius: 10px;
		border: 2px solid var(--card-border);
		text-align: center;
		cursor: pointer;
	}

	.btn-back i {
		font-size: 40px;
		color: var(--card-border);
	}

	.progress__container {
		width: 100%;
		height: 4rem;
		display: flex;
		justify-content: center;
	}

	.progress-bar {
		width: 60%;
		height: 1rem;
		/* background-color: rgba(211, 211, 211, 0.37); */
		border: 2px solid var(--card-border);
		border-radius: 20px;
		margin: 1.5rem;
	}

	.progress {
		width: 0;
		height: 100%;
		background-color: var(--main-blue);
		border-radius: 20px;
		transition: width 2s ease-in-out;
	}

	.question__section {
		width: 80%;
		height: 8.5rem;
		margin: 5px auto;
		text-align: center;
		background-color: var(--main-purple);
		border-radius: 18px;
		border: 2px solid var(--card-border);
	}

	.question__section p {
		font-size: 20px;
	}

	.alert {
		width: 7rem !important;
		height: 1.7rem;
		text-align: center;
		padding: 0.5rem;
		background-color: var(--main-blue);
		border: 2px solid var(--card-border);
		border-radius: 5px;
		opacity: 0;
		margin: 0 3rem;
	}

	.isVisible {
		opacity: 1;
	}

	.alert p {
		margin: 3px 0;
		color: var(--card-border);
		font-size: 18px;
	}

	.alert {
		width: 80%;
		text-align: center;
	}

	.alert p {
		font-size: 16px;
	}

	.heading {
		width: 100%;
		text-align: center;
	}

	.heading p {
		font-size: 21px;
		margin: 2rem 0;
	}
</style>
