<script>
	import * as faceapi from 'face-api.js';
	import { onMount } from 'svelte';
	import Timer from 'easytimer.js'
	

	$: video = {};
	$: btnTry = {};
	$: outputLabel = {};
	$: progressBar = {}

	let expressionResults = []
	let expressionItems = []
	let questionNumber = 0
	let loading = false


	const timer = new Timer()

	const MODEL_URL = 'models';
	const emotions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised', 'fearful'];

	let randomEmotion = emotions[Math.floor(Math.random() * 7)];


	onMount(() => {
		video = document.getElementById('video');
		btnTry = document.querySelector('.try');
		outputLabel = document.querySelector('.results');
		progressBar = document.querySelector('.progress')

		console.log(randomEmotion)

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

			expressionResults = []

			timer.start({
				countdown: true,
				startValues: {
					seconds: 5
				}
			})

			timer.addEventListener('secondsUpdated', (e) => {
				outputLabel.innerText = timer.getTimeValues()
			})

			timer.addEventListener('targetAchieved', async () => {
				outputLabel.innerText = 'Imitate!'

				const detection = await faceapi
					.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceExpressions();

				if (detection.length > 0) {
					expressionResults[0] = detection[0].expressions

					console.log(expressionResults)
					checkAnswer(detection[0].expressions)
				}

			})
			
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
		loading = true;

		if(detections[randomEmotion] > 0.70) {
			// outputLabel.innerText = 'Well done!!'
			// nextQuestion()
			console.log('true')
		} else {
			// outputLabel.innerText = `Let's try again!`
			console.log('Fail')
		}

		expressionItems = [...expressionItems, randomEmotion]

		loading = false;
	}

	function nextQuestion() {
		if(questionNumber < 6) {
			randomEmotion = emotions[Math.floor(Math.random() * 7)];
			++questionNumber;
			outputLabel.innerText = '';
			progressBar.style.width = `${(questionNumber / 5) * 100}%`;

			console.log(randomEmotion)
		}
	}
</script>

<div class="nav__container">
	<div class="btn-back">
		<!-- <i class="fi fi-rr-arrow-small-left"></i>	 -->
	</div>
	<p>Expression Match</p>
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
		font-size: 19px;
		margin-left: 0.9rem;
	}

	.question__container {
		width: 85%;
		height: 16.5rem;
		background-color: #fff;
		border-radius: 25px;
		border: 2px solid var(--card-border);
		margin: 2rem auto;
	}
	

	.card__container {
		width: 85%;
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
		background-color: var(--main-red);
		margin: 0 2rem 2rem;
		border-radius: 10px;
		border: 2px solid var(--card-border);
		text-align: center;
	}

	.btn-back i {
		font-size: 40px;
	}

	.progress__container {
		width: 100%;
		height: 4rem;
		display: flex;
		justify-content: center;
	}

	.progress-bar {
		width: 80%;
		height: 1.85rem;
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

</style>

