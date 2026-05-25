'use strict';

// Run line template
const runline = document.querySelectorAll('.run-line');
const template = document.querySelector('#run-line');

runline.forEach((el) => {
	let contents = template.content.cloneNode(true);
	el.appendChild(contents);
});

// Stages slider
const prevStage = document.querySelector('.stages__prev');
const nextStage = document.querySelector('.stages__next');
const stagesContent = document.querySelector('.stages__list');

let stageShift = 0;
const stageMaxIndex = 4;

const STAGE_COLUMN_GAP = 20;

function getStageStep() {
	/* Одна «страница» = ширина колонки сетки (335px) + gap (20px) */
	return 335 + STAGE_COLUMN_GAP;
}

function setStageDot(index) {
	document.querySelectorAll('.stages__slide-btn').forEach((btn, i) => {
		btn.classList.toggle('stages__slide-btn_active', i === index);
	});
}

function applyStageTransform() {
	if (window.innerWidth >= 1366) {
		stagesContent.style.transform = 'translateX(0)';
		setStageDot(0);
		return;
	}
	const step = getStageStep();
	stagesContent.style.transform =
		stageShift === 0 ? 'translateX(0)' : `translateX(-${stageShift * step}px)`;
	setStageDot(stageShift);
}

function prevStageSlide() {
	if (stageShift > 0) {
		stageShift--;
		applyStageTransform();
	}
}
prevStage.addEventListener('click', prevStageSlide);

function nextStageSlide() {
	if (stageShift < stageMaxIndex) {
		stageShift++;
		applyStageTransform();
	}
}
nextStage.addEventListener('click', nextStageSlide);

document.querySelectorAll('.stages__slide-btn').forEach((btn, index) => {
	btn.addEventListener('click', () => {
		if (window.innerWidth >= 1366) {
			return;
		}
		stageShift = index;
		applyStageTransform();
	});
});

// Members slider
const prevMember = document.querySelector('.members__prev');
const nextMember = document.querySelector('.members__next');
const currentCount = document.querySelector('.members__curr-count');
const maxCount = document.querySelector('.members__max-count');
const sliderContent = document.querySelector('.members__content');
const memberItems = sliderContent.querySelectorAll('.members__item');
const memberCount = memberItems.length;
const memberMaxIndex = memberCount - 1;

let memberShift = 0;

function getMemberStep() {
	if (memberItems.length < 2) {
		return memberItems[0]?.offsetWidth ?? 0;
	}
	return memberItems[1].offsetLeft - memberItems[0].offsetLeft;
}

function applyMemberTransform() {
	const step = getMemberStep();
	sliderContent.style.transform =
		memberShift === 0 ? 'translateX(0)' : `translateX(-${memberShift * step}px)`;
	currentCount.textContent = String(memberShift + 1);
}

function resetMembersSlider() {
	maxCount.textContent = String(memberCount);
	if (memberShift > memberMaxIndex) {
		memberShift = 0;
	}
	applyMemberTransform();
}

function resetStagesSlider() {
	if (window.innerWidth >= 1366) {
		stageShift = 0;
	} else if (stageShift > stageMaxIndex) {
		stageShift = 0;
	}
	applyStageTransform();
}

let resizeTimer;
window.addEventListener('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		resetMembersSlider();
		resetStagesSlider();
	}, 120);
});
resetMembersSlider();
resetStagesSlider();

function prevMembers() {
	if (memberShift > 0) {
		memberShift--;
		applyMemberTransform();
	}
}
prevMember.addEventListener('click', prevMembers);

function nextMembers() {
	if (memberShift < memberMaxIndex) {
		memberShift++;
	} else {
		memberShift = 0;
	}
	applyMemberTransform();
}
nextMember.addEventListener('click', nextMembers);