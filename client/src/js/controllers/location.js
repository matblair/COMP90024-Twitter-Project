app.controller("LocationController", ["$scope", "$http", "uiGmapGoogleMapApi", function($scope, $http, uiGmapGoogleMapApi) {

	/* PRE. ALL VARIABLES */

	/* Polarity Categories */
	// negative
	// neutral
	// positive
	
/*  Subjectivity Categories */
	// objective
	// subjective

	function sentiment() {
		return {
			selection: {
				polarity: null,
				subjectivity: null, 
				start_date: null,
				end_date: null, 
				date: null,
				political_leaning: null,
				language: null
			},	
			polarity_choices: [
				"negative",
				"neutral",
				"positive",
				""
			],
			subjectivity_choices: [
				"objective",
				"subjective",
				""
			],
			political_choices: [
				"democratic",
				"republican",
				""
			],
			languages: [ { code: 'ab', data: { name: 'Abkhaz', nativeName: 'аҧсуа' } }, { code: 'aa', data: { name: 'Afar', nativeName: 'Afaraf' } }, { code: 'af', data: { name: 'Afrikaans', nativeName: 'Afrikaans' } }, { code: 'ak', data: { name: 'Akan', nativeName: 'Akan' } }, { code: 'sq', data: { name: 'Albanian', nativeName: 'Shqip' } }, { code: 'am', data: { name: 'Amharic', nativeName: 'አማርኛ' } }, { code: 'ar', data: { name: 'Arabic', nativeName: 'العربية' } }, { code: 'an', data: { name: 'Aragonese', nativeName: 'Aragonés' } }, { code: 'hy', data: { name: 'Armenian', nativeName: 'Հայերեն' } }, { code: 'as', data: { name: 'Assamese', nativeName: 'অসমীয়া' } }, { code: 'av', data: { name: 'Avaric', nativeName: 'авар мацӀ, магӀарул мацӀ' } }, { code: 'ae', data: { name: 'Avestan', nativeName: 'avesta' } }, { code: 'ay', data: { name: 'Aymara', nativeName: 'aymar aru' } }, { code: 'az', data: { name: 'Azerbaijani', nativeName: 'azərbaycan dili' } }, { code: 'bm', data: { name: 'Bambara', nativeName: 'bamanankan' } }, { code: 'ba', data: { name: 'Bashkir', nativeName: 'башҡорт теле' } }, { code: 'eu', data: { name: 'Basque', nativeName: 'euskara, euskera' } }, { code: 'be', data: { name: 'Belarusian', nativeName: 'Беларуская' } }, { code: 'bn', data: { name: 'Bengali', nativeName: 'বাংলা' } }, { code: 'bh', data: { name: 'Bihari', nativeName: 'भोजपुरी' } }, { code: 'bi', data: { name: 'Bislama', nativeName: 'Bislama' } }, { code: 'bs', data: { name: 'Bosnian', nativeName: 'bosanski jezik' } }, { code: 'br', data: { name: 'Breton', nativeName: 'brezhoneg' } }, { code: 'bg', data: { name: 'Bulgarian', nativeName: 'български език' } }, { code: 'my', data: { name: 'Burmese', nativeName: 'ဗမာစာ' } }, { code: 'ca', data: { name: 'Catalan; Valencian', nativeName: 'Català' } }, { code: 'ch', data: { name: 'Chamorro', nativeName: 'Chamoru' } }, { code: 'ce', data: { name: 'Chechen', nativeName: 'нохчийн мотт' } }, { code: 'ny', data: { name: 'Chichewa; Chewa; Nyanja', nativeName: 'chiCheŵa, chinyanja' } }, { code: 'zh', data: { name: 'Chinese', nativeName: '中文 (Zhōngwén), 汉语, 漢語' } }, { code: 'cv', data: { name: 'Chuvash', nativeName: 'чӑваш чӗлхи' } }, { code: 'kw', data: { name: 'Cornish', nativeName: 'Kernewek' } }, { code: 'co', data: { name: 'Corsican', nativeName: 'corsu, lingua corsa' } }, { code: 'cr', data: { name: 'Cree', nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ' } }, { code: 'hr', data: { name: 'Croatian', nativeName: 'hrvatski' } }, { code: 'cs', data: { name: 'Czech', nativeName: 'česky, čeština' } }, { code: 'da', data: { name: 'Danish', nativeName: 'dansk' } }, { code: 'dv', data: { name: 'Divehi; Dhivehi; Maldivian;', nativeName: 'ދިވެހި' } }, { code: 'nl', data: { name: 'Dutch', nativeName: 'Nederlands, Vlaams' } }, { code: 'en', data: { name: 'English', nativeName: 'English' } }, { code: 'eo', data: { name: 'Esperanto', nativeName: 'Esperanto' } }, { code: 'et', data: { name: 'Estonian', nativeName: 'eesti, eesti keel' } }, { code: 'ee', data: { name: 'Ewe', nativeName: 'Eʋegbe' } }, { code: 'fo', data: { name: 'Faroese', nativeName: 'føroyskt' } }, { code: 'fj', data: { name: 'Fijian', nativeName: 'vosa Vakaviti' } }, { code: 'fi', data: { name: 'Finnish', nativeName: 'suomi, suomen kieli' } }, { code: 'fr', data: { name: 'French', nativeName: 'français, langue française' } }, { code: 'ff', data: { name: 'Fula; Fulah; Pulaar; Pular', nativeName: 'Fulfulde, Pulaar, Pular' } }, { code: 'gl', data: { name: 'Galician', nativeName: 'Galego' } }, { code: 'ka', data: { name: 'Georgian', nativeName: 'ქართული' } }, { code: 'de', data: { name: 'German', nativeName: 'Deutsch' } }, { code: 'el', data: { name: 'Greek, Modern', nativeName: 'Ελληνικά' } }, { code: 'gn', data: { name: 'Guaraní', nativeName: 'Avañeẽ' } }, { code: 'gu', data: { name: 'Gujarati', nativeName: 'ગુજરાતી' } }, { code: 'ht', data: { name: 'Haitian; Haitian Creole', nativeName: 'Kreyòl ayisyen' } }, { code: 'ha', data: { name: 'Hausa', nativeName: 'Hausa, هَوُسَ' } }, { code: 'he', data: { name: 'Hebrew (modern)', nativeName: 'עברית' } }, { code: 'hz', data: { name: 'Herero', nativeName: 'Otjiherero' } }, { code: 'hi', data: { name: 'Hindi', nativeName: 'हिन्दी, हिंदी' } }, { code: 'ho', data: { name: 'Hiri Motu', nativeName: 'Hiri Motu' } }, { code: 'hu', data: { name: 'Hungarian', nativeName: 'Magyar' } }, { code: 'ia', data: { name: 'Interlingua', nativeName: 'Interlingua' } }, { code: 'id', data: { name: 'Indonesian', nativeName: 'Bahasa Indonesia' } }, { code: 'ie', data: { name: 'Interlingue', nativeName: 'Originally called Occidental; then Interlingue after WWII' } }, { code: 'ga', data: { name: 'Irish', nativeName: 'Gaeilge' } }, { code: 'ig', data: { name: 'Igbo', nativeName: 'Asụsụ Igbo' } }, { code: 'ik', data: { name: 'Inupiaq', nativeName: 'Iñupiaq, Iñupiatun' } }, { code: 'io', data: { name: 'Ido', nativeName: 'Ido' } }, { code: 'is', data: { name: 'Icelandic', nativeName: 'Íslenska' } }, { code: 'it', data: { name: 'Italian', nativeName: 'Italiano' } }, { code: 'iu', data: { name: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ' } }, { code: 'ja', data: { name: 'Japanese', nativeName: '日本語 (にほんご／にっぽんご)' } }, { code: 'jv', data: { name: 'Javanese', nativeName: 'basa Jawa' } }, { code: 'kl', data: { name: 'Kalaallisut, Greenlandic', nativeName: 'kalaallisut, kalaallit oqaasii' } }, { code: 'kn', data: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' } }, { code: 'kr', data: { name: 'Kanuri', nativeName: 'Kanuri' } }, { code: 'ks', data: { name: 'Kashmiri', nativeName: 'कश्मीरी, كشميري‎' } }, { code: 'kk', data: { name: 'Kazakh', nativeName: 'Қазақ тілі' } }, { code: 'km', data: { name: 'Khmer', nativeName: 'ភាសាខ្មែរ' } }, { code: 'ki', data: { name: 'Kikuyu, Gikuyu', nativeName: 'Gĩkũyũ' } }, { code: 'rw', data: { name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' } }, { code: 'ky', data: { name: 'Kirghiz, Kyrgyz', nativeName: 'кыргыз тили' } }, { code: 'kv', data: { name: 'Komi', nativeName: 'коми кыв' } }, { code: 'kg', data: { name: 'Kongo', nativeName: 'KiKongo' } }, { code: 'ko', data: { name: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)' } }, { code: 'ku', data: { name: 'Kurdish', nativeName: 'Kurdî, كوردی‎' } }, { code: 'kj', data: { name: 'Kwanyama, Kuanyama', nativeName: 'Kuanyama' } }, { code: 'la', data: { name: 'Latin', nativeName: 'latine, lingua latina' } }, { code: 'lb', data: { name: 'Luxembourgish, Letzeburgesch', nativeName: 'Lëtzebuergesch' } }, { code: 'lg', data: { name: 'Luganda', nativeName: 'Luganda' } }, { code: 'li', data: { name: 'Limburgish, Limburgan, Limburger', nativeName: 'Limburgs' } }, { code: 'ln', data: { name: 'Lingala', nativeName: 'Lingála' } }, { code: 'lo', data: { name: 'Lao', nativeName: 'ພາສາລາວ' } }, { code: 'lt', data: { name: 'Lithuanian', nativeName: 'lietuvių kalba' } }, { code: 'lu', data: { name: 'Luba-Katanga', nativeName: '' } }, { code: 'lv', data: { name: 'Latvian', nativeName: 'latviešu valoda' } }, { code: 'gv', data: { name: 'Manx', nativeName: 'Gaelg, Gailck' } }, { code: 'mk', data: { name: 'Macedonian', nativeName: 'македонски јазик' } }, { code: 'mg', data: { name: 'Malagasy', nativeName: 'Malagasy fiteny' } }, { code: 'ms', data: { name: 'Malay', nativeName: 'bahasa Melayu, بهاس ملايو‎' } }, { code: 'ml', data: { name: 'Malayalam', nativeName: 'മലയാളം' } }, { code: 'mt', data: { name: 'Maltese', nativeName: 'Malti' } }, { code: 'mi', data: { name: 'Māori', nativeName: 'te reo Māori' } }, { code: 'mr', data: { name: 'Marathi (Marāṭhī)', nativeName: 'मराठी' } }, { code: 'mh', data: { name: 'Marshallese', nativeName: 'Kajin M̧ajeļ' } }, { code: 'mn', data: { name: 'Mongolian', nativeName: 'монгол' } }, { code: 'na', data: { name: 'Nauru', nativeName: 'Ekakairũ Naoero' } }, { code: 'nv', data: { name: 'Navajo, Navaho', nativeName: 'Diné bizaad, Dinékʼehǰí' } }, { code: 'nb', data: { name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål' } }, { code: 'nd', data: { name: 'North Ndebele', nativeName: 'isiNdebele' } }, { code: 'ne', data: { name: 'Nepali', nativeName: 'नेपाली' } }, { code: 'ng', data: { name: 'Ndonga', nativeName: 'Owambo' } }, { code: 'nn', data: { name: 'Norwegian Nynorsk', nativeName: 'Norsk nynorsk' } }, { code: 'no', data: { name: 'Norwegian', nativeName: 'Norsk' } }, { code: 'ii', data: { name: 'Nuosu', nativeName: 'ꆈꌠ꒿ Nuosuhxop' } }, { code: 'nr', data: { name: 'South Ndebele', nativeName: 'isiNdebele' } }, { code: 'oc', data: { name: 'Occitan', nativeName: 'Occitan' } }, { code: 'oj', data: { name: 'Ojibwe, Ojibwa', nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ' } }, { code: 'cu', data: { name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic', nativeName: 'ѩзыкъ словѣньскъ' } }, { code: 'om', data: { name: 'Oromo', nativeName: 'Afaan Oromoo' } }, { code: 'or', data: { name: 'Oriya', nativeName: 'ଓଡ଼ିଆ' } }, { code: 'os', data: { name: 'Ossetian, Ossetic', nativeName: 'ирон æвзаг' } }, { code: 'pa', data: { name: 'Panjabi, Punjabi', nativeName: 'ਪੰਜਾਬੀ, پنجابی‎' } }, { code: 'pi', data: { name: 'Pāli', nativeName: 'पाऴि' } }, { code: 'fa', data: { name: 'Persian', nativeName: 'فارسی' } }, { code: 'pl', data: { name: 'Polish', nativeName: 'polski' } }, { code: 'ps', data: { name: 'Pashto, Pushto', nativeName: 'پښتو' } }, { code: 'pt', data: { name: 'Portuguese', nativeName: 'Português' } }, { code: 'qu', data: { name: 'Quechua', nativeName: 'Runa Simi, Kichwa' } }, { code: 'rm', data: { name: 'Romansh', nativeName: 'rumantsch grischun' } }, { code: 'rn', data: { name: 'Kirundi', nativeName: 'kiRundi' } }, { code: 'ro', data: { name: 'Romanian, Moldavian, Moldovan', nativeName: 'română' } }, { code: 'ru', data: { name: 'Russian', nativeName: 'русский язык' } }, { code: 'sa', data: { name: 'Sanskrit (Saṁskṛta)', nativeName: 'संस्कृतम्' } }, { code: 'sc', data: { name: 'Sardinian', nativeName: 'sardu' } }, { code: 'sd', data: { name: 'Sindhi', nativeName: 'सिन्धी, سنڌي، سندھی‎' } }, { code: 'se', data: { name: 'Northern Sami', nativeName: 'Davvisámegiella' } }, { code: 'sm', data: { name: 'Samoan', nativeName: 'gagana faa Samoa' } }, { code: 'sg', data: { name: 'Sango', nativeName: 'yângâ tî sängö' } }, { code: 'sr', data: { name: 'Serbian', nativeName: 'српски језик' } }, { code: 'gd', data: { name: 'Scottish Gaelic; Gaelic', nativeName: 'Gàidhlig' } }, { code: 'sn', data: { name: 'Shona', nativeName: 'chiShona' } }, { code: 'si', data: { name: 'Sinhala, Sinhalese', nativeName: 'සිංහල' } }, { code: 'sk', data: { name: 'Slovak', nativeName: 'slovenčina' } }, { code: 'sl', data: { name: 'Slovene', nativeName: 'slovenščina' } }, { code: 'so', data: { name: 'Somali', nativeName: 'Soomaaliga, af Soomaali' } }, { code: 'st', data: { name: 'Southern Sotho', nativeName: 'Sesotho' } }, { code: 'es', data: { name: 'Spanish; Castilian', nativeName: 'español, castellano' } }, { code: 'su', data: { name: 'Sundanese', nativeName: 'Basa Sunda' } }, { code: 'sw', data: { name: 'Swahili', nativeName: 'Kiswahili' } }, { code: 'ss', data: { name: 'Swati', nativeName: 'SiSwati' } }, { code: 'sv', data: { name: 'Swedish', nativeName: 'svenska' } }, { code: 'ta', data: { name: 'Tamil', nativeName: 'தமிழ்' } }, { code: 'te', data: { name: 'Telugu', nativeName: 'తెలుగు' } }, { code: 'tg', data: { name: 'Tajik', nativeName: 'тоҷикӣ, toğikī, تاجیکی‎' } }, { code: 'th', data: { name: 'Thai', nativeName: 'ไทย' } }, { code: 'ti', data: { name: 'Tigrinya', nativeName: 'ትግርኛ' } }, { code: 'bo', data: { name: 'Tibetan Standard, Tibetan, Central', nativeName: 'བོད་ཡིག' } }, { code: 'tk', data: { name: 'Turkmen', nativeName: 'Türkmen, Түркмен' } }, { code: 'tl', data: { name: 'Tagalog', nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔' } }, { code: 'tn', data: { name: 'Tswana', nativeName: 'Setswana' } }, { code: 'to', data: { name: 'Tonga (Tonga Islands)', nativeName: 'faka Tonga' } }, { code: 'tr', data: { name: 'Turkish', nativeName: 'Türkçe' } }, { code: 'ts', data: { name: 'Tsonga', nativeName: 'Xitsonga' } }, { code: 'tt', data: { name: 'Tatar', nativeName: 'татарча, tatarça, تاتارچا‎' } }, { code: 'tw', data: { name: 'Twi', nativeName: 'Twi' } }, { code: 'ty', data: { name: 'Tahitian', nativeName: 'Reo Tahiti' } }, { code: 'ug', data: { name: 'Uighur, Uyghur', nativeName: 'Uyƣurqə, ئۇيغۇرچە‎' } }, { code: 'uk', data: { name: 'Ukrainian', nativeName: 'українська' } }, { code: 'ur', data: { name: 'Urdu', nativeName: 'اردو' } }, { code: 'uz', data: { name: 'Uzbek', nativeName: 'zbek, Ўзбек, أۇزبېك‎' } }, { code: 've', data: { name: 'Venda', nativeName: 'Tshivenḓa' } }, { code: 'vi', data: { name: 'Vietnamese', nativeName: 'Tiếng Việt' } }, { code: 'vo', data: { name: 'Volapük', nativeName: 'Volapük' } }, { code: 'wa', data: { name: 'Walloon', nativeName: 'Walon' } }, { code: 'cy', data: { name: 'Welsh', nativeName: 'Cymraeg' } }, { code: 'wo', data: { name: 'Wolof', nativeName: 'Wollof' } }, { code: 'fy', data: { name: 'Western Frisian', nativeName: 'Frysk' } }, { code: 'xh', data: { name: 'Xhosa', nativeName: 'isiXhosa' } }, { code: 'yi', data: { name: 'Yiddish', nativeName: 'ייִדיש' } }, { code: 'yo', data: { name: 'Yoruba', nativeName: 'Yorùbá' } }, { code: 'za', data: { name: 'Zhuang, Chuang', nativeName: 'Saɯ cueŋƅ, Saw cuengh' }}]
			};
		};

	function polarity_filter(data, wanted_pol) {
		var filtered = []
		data.forEach(function(d) {
			switch(wanted_pol) {
				case "negative":
					if ((d.sentiment.polarity) < -0.2)
						filtered.push(d)
					break;
				case "neutral":
					if ((d.sentiment.polarity) >= -0.2 || (d.sentiment.polarity) <= 0.2)
						filtered.push(d)
					break;
				case "positive":
					if ((d.sentiment.polarity) > 0.2)
						filtered.push(d)
					break;
				case "":
					filtered.push(d)
					break;
			};
		});
		console.log(wanted_pol, filtered);
		return filtered;
	};

	function subjectivity_filter(data, wanted_sub) {
		var filtered = []
		data.forEach(function(d) {
			switch(wanted_sub) {
				case "objective":
					if ((d.sentiment.subjectivity) < 0.5)
						filtered.push(d);
					break;
				case "subjective":
					if ((d.sentiment.subjectivity) >= 0.5)
						filtered.push(d);
					break;
				case "":
					filtered.push(d);
					break;
			};
		});
		console.log(wanted_sub, filtered);
		return filtered;
	}

	function date_parse(d) {
		return "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
	}

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

	uiGmapGoogleMapApi.then(function(maps) {

		/* 1. =================== General Sentiment ==================== */
		$scope.general_sentiment = new sentiment();

		$scope.map1 = {
			heatLayerCallback: function (layer) {
        //set the heat layers backend data
        var heatLayer = new _MapHeatLayer(layer);
      },
			center: {
	  		latitude: 29.4167,
	  		longitude: -98.5000
	  	},
	  	zoom: 11,
	  	pan: true,
	  	options: {
	  		scrollwheel: false,
	  		panControl: true,
	  		draggable: true
	  	},
	  	heatmap: {
	  		options: {
	  			radius: 25,
	  			opacity: 0.9,
	  			dissipating: true
	  		}
	  	}
		};

		// Heatmap Stuff

		$scope.general_sentiment.filteredHeatmapData = null;
		$scope.general_sentiment.heatmapToggle = false;

		function _MapHeatLayer(heatLayer) {
			var map, pointarray, heatmap;
			var locData = [];
			console.log("RENDER CALLED")
			$scope.general_sentiment.filteredHeatmapData.forEach(function(d) {
				//console.log(d)
				locData.push(new maps.LatLng((d.point.lat), (d.point.lon)))
			})
			//console.log(locData);
			heatLayer.setData(new maps.MVCArray(locData))
		};

		function heatmapFilter(data, fn) {
			console.log("polarity", $scope.general_sentiment.filter.polarity);
			console.log("subjectivity", $scope.general_sentiment.filter.subjectivity);
			return polarity_filter(subjectivity_filter($scope.general_sentiment.data.locations, $scope.general_sentiment.filter.subjectivity), $scope.general_sentiment.filter.polarity);
		}

		$scope.general_sentiment.heatmapUpdate = function() {
			$scope.general_sentiment.filteredHeatmapData = heatmapFilter($scope.general_sentiment.data.locations);
			$scope.general_sentiment.heatmapToggle = true;
		}
 	 
 		$scope.general_sentiment.call = function() {
 			$scope.general_sentiment.heatmapToggle = false;
 			var parameters = {
 				date: date_parse($scope.general_sentiment.selection.date),
 				political_leaning: $scope.general_sentiment.selection.political_leaning,
 				language: $scope.general_sentiment.selection.language
 			};
 			//console.log(parameters)
 			$scope.general_sentiment.promise = $http.get("http://144.6.227.63:4500/locations", {params: parameters}).
 				success(function(res) {
 					$scope.general_sentiment.data = res;
 					$scope.general_sentiment.filter.polarity = "";
 					$scope.general_sentiment.filter.subjectivity = "";
 					$scope.general_sentiment.heatmapUpdate();
 				}).
 				error(function(err) {
 					console.log(err);
 				})
 		}

		$scope.general_sentiment_language_callback = function($item) {
			console.log($item);
			$scope.general_sentiment.selection.language = $item.code;
		}

		$scope.general_sentiment.filter = {
			polarity: null,
			subjectivity: null
		}

		// Calendar Settings

		$scope.general_sentiment.toggleMax = function() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
	    $scope.maxDate = $scope.maxDate ? null : date;
	  };
	  $scope.general_sentiment.toggleMax();

	  $scope.general_sentiment.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.general_sentiment.date_opened = true;
	  };


		/* 1. =================== END General Sentiment ================ */

		/* 2. ======== Location Specific Sentiment ========== */
		$scope.specific_sentiment = new sentiment();

		$scope.specific_sentiment.edit_mode = false;
		$scope.specific_sentiment.data = null;

		$scope.specific_sentiment.selection = {
			start_date: null,
			end_date: null, 
			political_leaning: "",
			language: "",
			start_lat: null,
    	start_lon: null,
    	end_lat : null,
    	end_lon : null
		};


		function processPolarityBar(data) {
			function compare(a, b) {
				if (parseFloat(a.polarity) < parseFloat(b.polarity))
					return -1;
				if (parseFloat(a.polarity) > parseFloat(b.polarity))
					return 1;
				return 0;
			};
			var ds = Object.keys(data.polarities).map(function(k) { return { polarity: k, count: data.polarities[k] }});
			for (var i = 0; i < ds.length; i++) {
				if (ds[i].polarity == "-0.0") {
					ds[i].polarity = "-0.9"
					break;
				}
			}
			ds.sort(compare);
			return ds;
		}

		function processSubjectivityBar(data) {
			function compare(a, b) {
				if (a.subjectivity < b.subjectivity)
					return -1;
				if (a.subjectivity > b.subjectivity)
					return 1;
				return 0;
			};

			var ds = Object.keys(data.subjectivities).map(function(k) { return { subjectivity: k, count: data.subjectivities[k] }});
			ds.sort(compare)
			return ds;
		}

		$scope.specific_sentiment.call = function() {
			$scope.specific_sentiment.toggleEditMode();
			var parameters = $scope.specific_sentiment.selection;
			parameters.start_date = date_parse($scope.specific_sentiment.selection.start_date);
			parameters.end_date = date_parse($scope.specific_sentiment.selection.end_date);
			//console.log($scope.specific_sentiment.selection);
			$scope.specific_sentiment.promise = $http.get("http://144.6.227.63:4500/locations/sentiment", {params: parameters}).
				success(function(res) {
					$scope.specific_sentiment.data = res.sentiment;
					console.log(res);
					// process bar data
					$scope.specific_sentiment.subjectivityData = processSubjectivityBar($scope.specific_sentiment.data);
					$scope.specific_sentiment.polarityData = processPolarityBar($scope.specific_sentiment.data);
					$scope.specific_sentiment.edit_mode = false
				}).
				error(function(err) {
					console.log(err);
					$scope.specific_sentiment.edit_mode = false;
				})
		};


		$scope.specific_sentiment.toggleEditMode = function() {
			if (!$scope.specific_sentiment.edit_mode)
				$scope.specific_sentiment.edit_mode = true;
		};

		$scope.map = {
			center: {
	  		latitude: 29.4167,
	  		longitude: -98.5000
	  	},
	  	zoom: 11,
	  	pan: true,
	  	options: {
	  		scrollwheel: false,
	  		panControl: true,
	  		draggable: true
	  	}
		}
		
		// REMEMBER TO TOGGLE MAP MODES!
		$scope.map.mode = "CONTROL MODE";

		$scope.map.selection = {
			bounds:{},
	    stroke: {
	      color: '#08B21F',
	      weight: 2,
	      opacity: 1
	    },
	    fill: {
	      color: 'pink',
	      opacity: 0.5
	    },
	    events:{
	      bounds_changed: function(){
	      	var bounds = {
	      		sw: {
	      			lat: $scope.map.selection.bounds.getSouthWest().k,
	      			lon: $scope.map.selection.bounds.getSouthWest().D
	      		},
	      		ne: {
	      			lat: $scope.map.selection.bounds.getNorthEast().k,
	      			lon: $scope.map.selection.bounds.getNorthEast().D
	      		}
	      	};
	      	$scope.specific_sentiment.selection.start_lat = bounds.sw.lat;
	      	$scope.specific_sentiment.selection.end_lat = bounds.ne.lat;
	      	$scope.specific_sentiment.selection.start_lon = bounds.sw.lon;
	      	$scope.specific_sentiment.selection.end_lon = bounds.ne.lon;
	      	console.log()
	      }
	    },
	    draggable: true, // optional: defaults to false
	    clickable: true, // optional: defaults to true
	    editable: true, // optional: defaults to false
	    visible: true // optional: defaults to true
		};

		$scope.map.selection.bounds = new maps.LatLngBounds(
			new maps.LatLng(29.3906913302109, -98.51866149902327),
      new maps.LatLng(29.443644224231225, -98.46186828613281)
		)

		// Calendar Settings

		$scope.specific_sentiment.toggleMax = function() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
	    $scope.maxDate = $scope.maxDate ? null : date;
	  };
	  $scope.specific_sentiment.toggleMax();

	  $scope.specific_sentiment.open1 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.specific_sentiment.date_opened1 = true;
	  };

	  $scope.specific_sentiment.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.specific_sentiment.date_opened2 = true;
	  };

	});

	/* 2. ======== END Location Specific Sentiment ====== */


}]);