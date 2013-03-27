function restart() {
	deckView.shuffle();
}

RULES = {
	ace: {
		name: 'Drink one',
		rule: 'Take one drink'
	},
	two: {
		name: ' Drink Two',
		rule: 'Take two drinks'
	},
	three: {
		name: 'Drink One, Give One',
		rule: 'Take one drink, give two drinks'
	},
	four: {
		name: 'Thumb Master',
		rule: 'Whoever has this card can put there thumb on the talbe and the last player to put his/her thumb on the table has to drink, then the thumb master can take it off, then whoever the last to take it off has to drink, this card is good until another 4 is picked.'
	},
	five: {
		name: 'Rule ',
		rule: 'Make a rule for the game for example no swearing or no name aloud to be said, but it can\'t conderdict any rules of the game, anyone who breaks the rules has to drink'
	},
	six: {
		name: 'Question',
		rule: 'The person with this card at any time of the game can ask a question but only one and if anyone answer them that persons has to drink'
	},
	seven: {
		name: 'Sociable',
		rule: 'Everyone at the table has to have a cheers and drink'
	},
	eight: {
		name: 'Sentence ',
		rule: 'Start a sentence with one word and everyone has one add to it depending who turn it is next for example I, I was, I was going, I was going to, I was going to get, I was going to get drunk, whoever messes it up has to drink'
	},
	nine: {
		name: 'Rhyme Time',
		rule: 'Whoever picks this card has to say a word, everyone else has to rhyme with it, same word can\'t be use twice, whoever gets stuck or messes up has to drink'
	},
	ten: {
		name: 'Topic',
		rule: 'Whoever picks this card has to think of a topic and everyone else has to say something that relates to it until someone messes up, then they drink'
	},
	jack: {
		name: 'Wild card',
		rule: 'Pick any other rule'
	},
	queen: {
		name: 'Beer bitch',
		rule: 'The person with this card has to get people their beers anytime that person wants one, no matter where they are,until another Q is picked'
	},
	king: {
		name: 'Waterfall',
		rule: 'The person who pulls the card corresponding to this game starts drinking his/her drink. The chain reaction goes clockwise and the person to the left of the starter HAS to start when he/she starts. Everyone has to start drinking when the person before them starts to drink. You have to keep chugging until the person before you stop. The person who pulled the card is basically in control of the stopping; however, you don\'t have to stop when the person before you stops (you only have to start when they start and you can\'t stop until they do). If you want to keep chugging and get some people drunk that are after you, KEEP ON CHUGGIN!'
	}
};

(function() {
	PlayingCards.CardView.prototype.events = {
		'click': 'action'

	};
	PlayingCards.CardView.prototype.action = function() {
		var _this = this.model.attributes;

		if(!_this.front){
			this.flip();
			$('.rules li.alert-box').removeClass('alert-box');
			$('.explain p').addClass('hide');
			$('.explain p.'+_this.rank.name).removeClass('hide');
			$('.'+_this.rank.name).addClass('alert-box success');
			var explain = RULES[_this.rank.name].name;
			var rule = RULES[_this.rank.name].rule;
			$('#card-show p').text(rule);
			$('#card-show h2').text(explain)
			$('#card-show .card').empty().html(this.content());
			$('#card-show').foundation('reveal', 'open');
		}
	};
	$(function() {
		var Settings, datgui, deckModel, deckView, settings;
		Settings = (function() {
			function Settings() {
				this.width = 83;
				this.order = 'random';
				this.rotation = 0;
			}
			return Settings;
		})();
		settings = new Settings();
		deckModel = new PlayingCards.DeckModel(null, {
			front: false
		});
		//deck view
		deckView = new PlayingCards.DeckView({
			el: $('#cards'),
			model: deckModel,
			templates: new PlayingCards.Templates()
		});
		deckView.setCardWidth(settings.width);
		deckView.shuffle();
		deckView.render();


		// Generate rules
		// rules are from http://www.barnonedrinks.com/games/s/sociable-233.html Credit Clinton Noble

		var rules = $('.rules');
		for (var rank in PlayingCards.RANK) {
			rules.find('ul').append('<li class="'+rank+'" title="'+RULES[rank].rule+'"><span class="label secondary">'+PlayingCards.RANK[rank].symbol + '</span> ' + RULES[rank].name+'</li>');
			$('.explain').append('<p class="hide '+rank+'">'+RULES[rank].rule+'</p>');
		};
		//dat gui
/*		datgui = new dat.GUI();
		datgui.add(settings, 'width').min(10).max(500).step(1).onChange(function(value) {
			return deckView.setCardWidth(value);
		});
		datgui.add(settings, 'order', ['sorted', 'random']).onChange(function(value) {
			switch (value) {
				case 'sorted':
				return deckView.sort();
				case 'random':
				return deckView.shuffle();
			}
		});*/
});
}).call(this);


