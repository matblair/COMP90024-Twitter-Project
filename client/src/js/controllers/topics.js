app.controller("TopicController", ["$scope", "uiGmapGoogleMapApi", "$http", function($scope, uiGmapGoogleMapApi, $http) {

	function date_parse(d) {
		return "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
	}

	function polarity_filter(data, wanted_pol) {
		var filtered = []
		data.forEach(function(d) {
			switch(wanted_pol) {
				case "negative":
					if ((d.polarity) < -0.2)
						filtered.push(d)
					break;
				case "neutral":
					if ((d.polarity) >= -0.2 || (d.polarity) <= 0.2)
						filtered.push(d)
					break;
				case "positive":
					if ((d.polarity) > 0.2)
						filtered.push(d)
					break;
				case "":
					filtered.push(d)
					break;
			};
		});
		//console.log(wanted_pol, filtered);
		return filtered;
	};

	function subjectivity_filter(data, wanted_sub) {
		var filtered = []
		data.forEach(function(d) {
			switch(wanted_sub) {
				case "objective":
					if ((d.subjectivity) < 0.5)
						filtered.push(d);
					break;
				case "subjective":
					if ((d.subjectivity) >= 0.5)
						filtered.push(d);
					break;
				case "":
					filtered.push(d);
					break;
			};
		});
		//console.log(wanted_sub, filtered);
		return filtered;
	}

	function date_parse(d) {
		return "" + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
	}

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

	$scope.topic = {
		languages: [ { code: 'ab', data: { name: 'Abkhaz', nativeName: 'аҧсуа' } }, { code: 'aa', data: { name: 'Afar', nativeName: 'Afaraf' } }, { code: 'af', data: { name: 'Afrikaans', nativeName: 'Afrikaans' } }, { code: 'ak', data: { name: 'Akan', nativeName: 'Akan' } }, { code: 'sq', data: { name: 'Albanian', nativeName: 'Shqip' } }, { code: 'am', data: { name: 'Amharic', nativeName: 'አማርኛ' } }, { code: 'ar', data: { name: 'Arabic', nativeName: 'العربية' } }, { code: 'an', data: { name: 'Aragonese', nativeName: 'Aragonés' } }, { code: 'hy', data: { name: 'Armenian', nativeName: 'Հայերեն' } }, { code: 'as', data: { name: 'Assamese', nativeName: 'অসমীয়া' } }, { code: 'av', data: { name: 'Avaric', nativeName: 'авар мацӀ, магӀарул мацӀ' } }, { code: 'ae', data: { name: 'Avestan', nativeName: 'avesta' } }, { code: 'ay', data: { name: 'Aymara', nativeName: 'aymar aru' } }, { code: 'az', data: { name: 'Azerbaijani', nativeName: 'azərbaycan dili' } }, { code: 'bm', data: { name: 'Bambara', nativeName: 'bamanankan' } }, { code: 'ba', data: { name: 'Bashkir', nativeName: 'башҡорт теле' } }, { code: 'eu', data: { name: 'Basque', nativeName: 'euskara, euskera' } }, { code: 'be', data: { name: 'Belarusian', nativeName: 'Беларуская' } }, { code: 'bn', data: { name: 'Bengali', nativeName: 'বাংলা' } }, { code: 'bh', data: { name: 'Bihari', nativeName: 'भोजपुरी' } }, { code: 'bi', data: { name: 'Bislama', nativeName: 'Bislama' } }, { code: 'bs', data: { name: 'Bosnian', nativeName: 'bosanski jezik' } }, { code: 'br', data: { name: 'Breton', nativeName: 'brezhoneg' } }, { code: 'bg', data: { name: 'Bulgarian', nativeName: 'български език' } }, { code: 'my', data: { name: 'Burmese', nativeName: 'ဗမာစာ' } }, { code: 'ca', data: { name: 'Catalan; Valencian', nativeName: 'Català' } }, { code: 'ch', data: { name: 'Chamorro', nativeName: 'Chamoru' } }, { code: 'ce', data: { name: 'Chechen', nativeName: 'нохчийн мотт' } }, { code: 'ny', data: { name: 'Chichewa; Chewa; Nyanja', nativeName: 'chiCheŵa, chinyanja' } }, { code: 'zh', data: { name: 'Chinese', nativeName: '中文 (Zhōngwén), 汉语, 漢語' } }, { code: 'cv', data: { name: 'Chuvash', nativeName: 'чӑваш чӗлхи' } }, { code: 'kw', data: { name: 'Cornish', nativeName: 'Kernewek' } }, { code: 'co', data: { name: 'Corsican', nativeName: 'corsu, lingua corsa' } }, { code: 'cr', data: { name: 'Cree', nativeName: 'ᓀᐦᐃᔭᐍᐏᐣ' } }, { code: 'hr', data: { name: 'Croatian', nativeName: 'hrvatski' } }, { code: 'cs', data: { name: 'Czech', nativeName: 'česky, čeština' } }, { code: 'da', data: { name: 'Danish', nativeName: 'dansk' } }, { code: 'dv', data: { name: 'Divehi; Dhivehi; Maldivian;', nativeName: 'ދިވެހި' } }, { code: 'nl', data: { name: 'Dutch', nativeName: 'Nederlands, Vlaams' } }, { code: 'en', data: { name: 'English', nativeName: 'English' } }, { code: 'eo', data: { name: 'Esperanto', nativeName: 'Esperanto' } }, { code: 'et', data: { name: 'Estonian', nativeName: 'eesti, eesti keel' } }, { code: 'ee', data: { name: 'Ewe', nativeName: 'Eʋegbe' } }, { code: 'fo', data: { name: 'Faroese', nativeName: 'føroyskt' } }, { code: 'fj', data: { name: 'Fijian', nativeName: 'vosa Vakaviti' } }, { code: 'fi', data: { name: 'Finnish', nativeName: 'suomi, suomen kieli' } }, { code: 'fr', data: { name: 'French', nativeName: 'français, langue française' } }, { code: 'ff', data: { name: 'Fula; Fulah; Pulaar; Pular', nativeName: 'Fulfulde, Pulaar, Pular' } }, { code: 'gl', data: { name: 'Galician', nativeName: 'Galego' } }, { code: 'ka', data: { name: 'Georgian', nativeName: 'ქართული' } }, { code: 'de', data: { name: 'German', nativeName: 'Deutsch' } }, { code: 'el', data: { name: 'Greek, Modern', nativeName: 'Ελληνικά' } }, { code: 'gn', data: { name: 'Guaraní', nativeName: 'Avañeẽ' } }, { code: 'gu', data: { name: 'Gujarati', nativeName: 'ગુજરાતી' } }, { code: 'ht', data: { name: 'Haitian; Haitian Creole', nativeName: 'Kreyòl ayisyen' } }, { code: 'ha', data: { name: 'Hausa', nativeName: 'Hausa, هَوُسَ' } }, { code: 'he', data: { name: 'Hebrew (modern)', nativeName: 'עברית' } }, { code: 'hz', data: { name: 'Herero', nativeName: 'Otjiherero' } }, { code: 'hi', data: { name: 'Hindi', nativeName: 'हिन्दी, हिंदी' } }, { code: 'ho', data: { name: 'Hiri Motu', nativeName: 'Hiri Motu' } }, { code: 'hu', data: { name: 'Hungarian', nativeName: 'Magyar' } }, { code: 'ia', data: { name: 'Interlingua', nativeName: 'Interlingua' } }, { code: 'id', data: { name: 'Indonesian', nativeName: 'Bahasa Indonesia' } }, { code: 'ie', data: { name: 'Interlingue', nativeName: 'Originally called Occidental; then Interlingue after WWII' } }, { code: 'ga', data: { name: 'Irish', nativeName: 'Gaeilge' } }, { code: 'ig', data: { name: 'Igbo', nativeName: 'Asụsụ Igbo' } }, { code: 'ik', data: { name: 'Inupiaq', nativeName: 'Iñupiaq, Iñupiatun' } }, { code: 'io', data: { name: 'Ido', nativeName: 'Ido' } }, { code: 'is', data: { name: 'Icelandic', nativeName: 'Íslenska' } }, { code: 'it', data: { name: 'Italian', nativeName: 'Italiano' } }, { code: 'iu', data: { name: 'Inuktitut', nativeName: 'ᐃᓄᒃᑎᑐᑦ' } }, { code: 'ja', data: { name: 'Japanese', nativeName: '日本語 (にほんご／にっぽんご)' } }, { code: 'jv', data: { name: 'Javanese', nativeName: 'basa Jawa' } }, { code: 'kl', data: { name: 'Kalaallisut, Greenlandic', nativeName: 'kalaallisut, kalaallit oqaasii' } }, { code: 'kn', data: { name: 'Kannada', nativeName: 'ಕನ್ನಡ' } }, { code: 'kr', data: { name: 'Kanuri', nativeName: 'Kanuri' } }, { code: 'ks', data: { name: 'Kashmiri', nativeName: 'कश्मीरी, كشميري‎' } }, { code: 'kk', data: { name: 'Kazakh', nativeName: 'Қазақ тілі' } }, { code: 'km', data: { name: 'Khmer', nativeName: 'ភាសាខ្មែរ' } }, { code: 'ki', data: { name: 'Kikuyu, Gikuyu', nativeName: 'Gĩkũyũ' } }, { code: 'rw', data: { name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' } }, { code: 'ky', data: { name: 'Kirghiz, Kyrgyz', nativeName: 'кыргыз тили' } }, { code: 'kv', data: { name: 'Komi', nativeName: 'коми кыв' } }, { code: 'kg', data: { name: 'Kongo', nativeName: 'KiKongo' } }, { code: 'ko', data: { name: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)' } }, { code: 'ku', data: { name: 'Kurdish', nativeName: 'Kurdî, كوردی‎' } }, { code: 'kj', data: { name: 'Kwanyama, Kuanyama', nativeName: 'Kuanyama' } }, { code: 'la', data: { name: 'Latin', nativeName: 'latine, lingua latina' } }, { code: 'lb', data: { name: 'Luxembourgish, Letzeburgesch', nativeName: 'Lëtzebuergesch' } }, { code: 'lg', data: { name: 'Luganda', nativeName: 'Luganda' } }, { code: 'li', data: { name: 'Limburgish, Limburgan, Limburger', nativeName: 'Limburgs' } }, { code: 'ln', data: { name: 'Lingala', nativeName: 'Lingála' } }, { code: 'lo', data: { name: 'Lao', nativeName: 'ພາສາລາວ' } }, { code: 'lt', data: { name: 'Lithuanian', nativeName: 'lietuvių kalba' } }, { code: 'lu', data: { name: 'Luba-Katanga', nativeName: '' } }, { code: 'lv', data: { name: 'Latvian', nativeName: 'latviešu valoda' } }, { code: 'gv', data: { name: 'Manx', nativeName: 'Gaelg, Gailck' } }, { code: 'mk', data: { name: 'Macedonian', nativeName: 'македонски јазик' } }, { code: 'mg', data: { name: 'Malagasy', nativeName: 'Malagasy fiteny' } }, { code: 'ms', data: { name: 'Malay', nativeName: 'bahasa Melayu, بهاس ملايو‎' } }, { code: 'ml', data: { name: 'Malayalam', nativeName: 'മലയാളം' } }, { code: 'mt', data: { name: 'Maltese', nativeName: 'Malti' } }, { code: 'mi', data: { name: 'Māori', nativeName: 'te reo Māori' } }, { code: 'mr', data: { name: 'Marathi (Marāṭhī)', nativeName: 'मराठी' } }, { code: 'mh', data: { name: 'Marshallese', nativeName: 'Kajin M̧ajeļ' } }, { code: 'mn', data: { name: 'Mongolian', nativeName: 'монгол' } }, { code: 'na', data: { name: 'Nauru', nativeName: 'Ekakairũ Naoero' } }, { code: 'nv', data: { name: 'Navajo, Navaho', nativeName: 'Diné bizaad, Dinékʼehǰí' } }, { code: 'nb', data: { name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål' } }, { code: 'nd', data: { name: 'North Ndebele', nativeName: 'isiNdebele' } }, { code: 'ne', data: { name: 'Nepali', nativeName: 'नेपाली' } }, { code: 'ng', data: { name: 'Ndonga', nativeName: 'Owambo' } }, { code: 'nn', data: { name: 'Norwegian Nynorsk', nativeName: 'Norsk nynorsk' } }, { code: 'no', data: { name: 'Norwegian', nativeName: 'Norsk' } }, { code: 'ii', data: { name: 'Nuosu', nativeName: 'ꆈꌠ꒿ Nuosuhxop' } }, { code: 'nr', data: { name: 'South Ndebele', nativeName: 'isiNdebele' } }, { code: 'oc', data: { name: 'Occitan', nativeName: 'Occitan' } }, { code: 'oj', data: { name: 'Ojibwe, Ojibwa', nativeName: 'ᐊᓂᔑᓈᐯᒧᐎᓐ' } }, { code: 'cu', data: { name: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic', nativeName: 'ѩзыкъ словѣньскъ' } }, { code: 'om', data: { name: 'Oromo', nativeName: 'Afaan Oromoo' } }, { code: 'or', data: { name: 'Oriya', nativeName: 'ଓଡ଼ିଆ' } }, { code: 'os', data: { name: 'Ossetian, Ossetic', nativeName: 'ирон æвзаг' } }, { code: 'pa', data: { name: 'Panjabi, Punjabi', nativeName: 'ਪੰਜਾਬੀ, پنجابی‎' } }, { code: 'pi', data: { name: 'Pāli', nativeName: 'पाऴि' } }, { code: 'fa', data: { name: 'Persian', nativeName: 'فارسی' } }, { code: 'pl', data: { name: 'Polish', nativeName: 'polski' } }, { code: 'ps', data: { name: 'Pashto, Pushto', nativeName: 'پښتو' } }, { code: 'pt', data: { name: 'Portuguese', nativeName: 'Português' } }, { code: 'qu', data: { name: 'Quechua', nativeName: 'Runa Simi, Kichwa' } }, { code: 'rm', data: { name: 'Romansh', nativeName: 'rumantsch grischun' } }, { code: 'rn', data: { name: 'Kirundi', nativeName: 'kiRundi' } }, { code: 'ro', data: { name: 'Romanian, Moldavian, Moldovan', nativeName: 'română' } }, { code: 'ru', data: { name: 'Russian', nativeName: 'русский язык' } }, { code: 'sa', data: { name: 'Sanskrit (Saṁskṛta)', nativeName: 'संस्कृतम्' } }, { code: 'sc', data: { name: 'Sardinian', nativeName: 'sardu' } }, { code: 'sd', data: { name: 'Sindhi', nativeName: 'सिन्धी, سنڌي، سندھی‎' } }, { code: 'se', data: { name: 'Northern Sami', nativeName: 'Davvisámegiella' } }, { code: 'sm', data: { name: 'Samoan', nativeName: 'gagana faa Samoa' } }, { code: 'sg', data: { name: 'Sango', nativeName: 'yângâ tî sängö' } }, { code: 'sr', data: { name: 'Serbian', nativeName: 'српски језик' } }, { code: 'gd', data: { name: 'Scottish Gaelic; Gaelic', nativeName: 'Gàidhlig' } }, { code: 'sn', data: { name: 'Shona', nativeName: 'chiShona' } }, { code: 'si', data: { name: 'Sinhala, Sinhalese', nativeName: 'සිංහල' } }, { code: 'sk', data: { name: 'Slovak', nativeName: 'slovenčina' } }, { code: 'sl', data: { name: 'Slovene', nativeName: 'slovenščina' } }, { code: 'so', data: { name: 'Somali', nativeName: 'Soomaaliga, af Soomaali' } }, { code: 'st', data: { name: 'Southern Sotho', nativeName: 'Sesotho' } }, { code: 'es', data: { name: 'Spanish; Castilian', nativeName: 'español, castellano' } }, { code: 'su', data: { name: 'Sundanese', nativeName: 'Basa Sunda' } }, { code: 'sw', data: { name: 'Swahili', nativeName: 'Kiswahili' } }, { code: 'ss', data: { name: 'Swati', nativeName: 'SiSwati' } }, { code: 'sv', data: { name: 'Swedish', nativeName: 'svenska' } }, { code: 'ta', data: { name: 'Tamil', nativeName: 'தமிழ்' } }, { code: 'te', data: { name: 'Telugu', nativeName: 'తెలుగు' } }, { code: 'tg', data: { name: 'Tajik', nativeName: 'тоҷикӣ, toğikī, تاجیکی‎' } }, { code: 'th', data: { name: 'Thai', nativeName: 'ไทย' } }, { code: 'ti', data: { name: 'Tigrinya', nativeName: 'ትግርኛ' } }, { code: 'bo', data: { name: 'Tibetan Standard, Tibetan, Central', nativeName: 'བོད་ཡིག' } }, { code: 'tk', data: { name: 'Turkmen', nativeName: 'Türkmen, Түркмен' } }, { code: 'tl', data: { name: 'Tagalog', nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔' } }, { code: 'tn', data: { name: 'Tswana', nativeName: 'Setswana' } }, { code: 'to', data: { name: 'Tonga (Tonga Islands)', nativeName: 'faka Tonga' } }, { code: 'tr', data: { name: 'Turkish', nativeName: 'Türkçe' } }, { code: 'ts', data: { name: 'Tsonga', nativeName: 'Xitsonga' } }, { code: 'tt', data: { name: 'Tatar', nativeName: 'татарча, tatarça, تاتارچا‎' } }, { code: 'tw', data: { name: 'Twi', nativeName: 'Twi' } }, { code: 'ty', data: { name: 'Tahitian', nativeName: 'Reo Tahiti' } }, { code: 'ug', data: { name: 'Uighur, Uyghur', nativeName: 'Uyƣurqə, ئۇيغۇرچە‎' } }, { code: 'uk', data: { name: 'Ukrainian', nativeName: 'українська' } }, { code: 'ur', data: { name: 'Urdu', nativeName: 'اردو' } }, { code: 'uz', data: { name: 'Uzbek', nativeName: 'zbek, Ўзбек, أۇزبېك‎' } }, { code: 've', data: { name: 'Venda', nativeName: 'Tshivenḓa' } }, { code: 'vi', data: { name: 'Vietnamese', nativeName: 'Tiếng Việt' } }, { code: 'vo', data: { name: 'Volapük', nativeName: 'Volapük' } }, { code: 'wa', data: { name: 'Walloon', nativeName: 'Walon' } }, { code: 'cy', data: { name: 'Welsh', nativeName: 'Cymraeg' } }, { code: 'wo', data: { name: 'Wolof', nativeName: 'Wollof' } }, { code: 'fy', data: { name: 'Western Frisian', nativeName: 'Frysk' } }, { code: 'xh', data: { name: 'Xhosa', nativeName: 'isiXhosa' } }, { code: 'yi', data: { name: 'Yiddish', nativeName: 'ייִדיש' } }, { code: 'yo', data: { name: 'Yoruba', nativeName: 'Yorùbá' } }, { code: 'za', data: { name: 'Zhuang, Chuang', nativeName: 'Saɯ cueŋƅ, Saw cuengh' }}]
	};

	uiGmapGoogleMapApi.then(function(maps) {

		/* 1. ==================== Summary ====================== */
		$scope.summary = {
			params: {
				start_date: null,
				end_date: null
			}
		}
		// QUERY ACTION
		$scope.summary.query = function() {
			$scope.summary.params.start_date = date_parse($scope.summary.params.start_date);
			$scope.summary.params.end_date = date_parse($scope.summary.params.end_date);
			$scope.summary.promise = $http.get(("http://144.6.227.63:4500/topics/" + $scope.topic.path), {params: $scope.summary.params}).
				then(function(res) {
					// All Topic Tweets
					var data = res.data;
					console.log(res);
					// for each most popular language, query.
					var popular_langs = data.most_popular_languages;
					popular_langs.forEach(function(lang) {
						$scope.summary.params.language = lang;
						console.log($scope.summary.params);
						$http.get("http://144.6.227.63:4500/topics/" + $scope.topic.path, { params: $scope.summary.params }).
							success(function(res) {
								console.log(res);
							}).
							error(function(err) {
								console.log(err);
							});
					});
					// for each least popular language, query.
					var minor_langs = data.least_popular_languages;
					minor_langs.forEach(function(lang) {
						$scope.summary.params.language = lang;
						console.log($scope.summary.params);
						$http.get("http://144.6.227.63:4500/topics/" + $scope.topic.path, { params: $scope.summary.params }).
							success(function(res) {
								console.log(res);
							}).
							error(function(err) {
								console.log(err);
							});
					});

					// republican query

					// democratic query
				}).
				then(function() {
					// render all visualisation graphs.
				})
		};

		// Calendar Stuff
		$scope.summary.toggleMax = function() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
	    $scope.maxDate = $scope.maxDate ? null : date;
	  };
	  $scope.summary.toggleMax();

	  $scope.summary.open1 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.summary.date_opened1 = true;
	  };

	  $scope.summary.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.summary.date_opened2 = true;
	  };

		/* 1. END ================== Summary ============================ */

		/* 2. ====================== Topic Trends ======================= */
		$scope.trend = {
			granularities: [
				"hourly",
				"daily",
				"weekly",
				"monthly",
				"yearly"
			],
			political_choices: [
				"democratic",
				"republican"
			],
			updating: true
		}

		$scope.trend.language_callback = function(s) {
			$scope.trend.selection.language = s.code;
		}

		// Calendar Settings

		$scope.trend.toggleMax = function() {
			var date = new Date();
			date.setDate(date.getDate() - 1);
	    $scope.maxDate = $scope.maxDate ? null : date;
	  };
	  $scope.trend.toggleMax();

	  $scope.trend.open1 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.trend.date_opened1 = true;
	  };

	  $scope.trend.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.trend.date_opened2 = true;
	  };

	  function ordinal_identifier(str) {
	  	switch(str) {
	  		case "1st":
	  			return 1
	  		case "2nd":
	  			return 2
	  		case "3rd":
	  			return 3
	  		case "21st":
	  			return 21
	  		case "22nd":
	  			return 22
	  		case "23rd":
	  			return 23
	  	}
	  	return parseInt(str.slice(0, -2));
	  }

	  function month_identifier(str) {
	  	switch(str) {
	  		case "January":
	  			return 0
	  		case "February":
	  			return 1
	  		case "March":
	  			return 2
	  		case "April":
	  			return 3
	  		case "May":
	  			return 4
	  		case "June":
	  			return 5
	  		case "July":
	  			return 6
	  		case "August":
	  			return 7
	  		case "September":
	  			return 8
	  		case "October":
	  			return 9
	  		case "November":
	  			return 10
	  		case "December":
	  			return 11
	  	}
	  }

	  function date_parser(str) {
	  	var regex = /(\w+)/g;
	  	var dates = str.match(regex)
	  	//console.log(dates);
	  	var month = month_identifier(dates[0])
	  	var day = ordinal_identifier(dates[1])
	  	var year = parseInt(dates[2])
	  	var hour = parseInt(dates[3])
	  	var minute = 0
	  	return new Date(year, month, day, hour, minute);
	  }

	  function data2MultiLine(data) {
	  	var lineStruct = [];	
	  	
	  	var u = data.unemployment.time_periods;
	  	var gc = data.gun_control.time_periods;
	  	var i = data.immigration.time_periods;

	  	for (var a = 0; a < u.length; a++) {
	  		lineStruct.push({date: date_parser(u[a].start), unemployment: u[a].count, gun_control: gc[a].count, immigration: i[a].count});
	  	}
	  	console.log(lineStruct);
	  	return lineStruct;
	  }

	  $scope.trend.query = function() {
	  	$scope.trend.updating = true;
	  	var parameters = $scope.trend.selection;
	  	parameters.start_date = date_parse($scope.trend.selection.start_date);
	  	parameters.end_date = date_parse($scope.trend.selection.end_date);
	  	if (parameters.granularity != null)
	  		parameters.granularity = $scope.trend.selection.granularity.trim();
	  	if (parameters.political_leaning != null)
	  		parameters.political_leaning = $scope.trend.selection.political_leaning.trim();
	  	$scope.trend.promise = $http.get("http://144.6.227.63:4500/topics/unemployment/trend", {params: parameters}).
				then(function(res) {
					$scope.trend.unemployment = res.data;
					return $http.get("http://144.6.227.63:4500/topics/mention_immigration/trend", {params: parameters})
				}).	  	
				then(function(res) {
					$scope.trend.immigration = res.data;
					return $http.get("http://144.6.227.63:4500/topics/gun_control/trend", {params: parameters})
				}).
				then(function(res) {
					$scope.trend.gun_control = res.data;
					console.log($scope.trend);
					$scope.trend.line = data2MultiLine($scope.trend)
					$scope.trend.updating = false;
				});
	  }


		/* 2. END ================== Topic Trends ======================= */

		

		/* 3. ====================== Topic Locations ==================== */
		$scope.location = {
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
			updating: true,
			filtered: null,
			filter: {
				polarity: "",
				subjectivity: ""
			},
			topics: [
				"Gun Control",
				"Immigration",
				"Unemployment"
			]
		};
		$scope.location.query = function(topic) {
			$scope.location.updating = true;
			function getPath(topicName) {
				console.log("topicname", topicName)
				if (topicName == " Gun Control ")
					return "gun_control"
				if (topicName == " Unemployment ")
					return "unemployment"
				if (topicName == " Immigration ")
					return "mention_immigration"
			};
			 
			$scope.location.promise = $http.get("http://144.6.227.63:4500/topics/" + getPath(topic) + "/locations").
				success(function(res) {
					console.log(res);
					$scope.location.data = res.locations;
					$scope.location.heatmapUpdate();
				}).
				error(function(err) {
					console.log(err);
					alert(err);
				})
		}

		$scope.location.heatmapUpdate = function() {
			$scope.location.filtered = polarity_filter(subjectivity_filter($scope.location.data, $scope.location.filter.subjectivity), $scope.location.filter.polarity);
			$scope.location.updating = false;
		};

		// Google Maps
		$scope.map = {
			heatLayerCallback: function (layer) {
        //set the heat layers backend data
        var heatLayer = new MapHeatLayer(layer);
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

		function MapHeatLayer(heatLayer) {
			var map, pointarray, heatmap;
			var locData = [];
			//console.log("RENDER CALLED")
			if (!$scope.location.filtered) return;
			$scope.location.filtered.forEach(function(d) {
				//console.log(d)
				locData.push(new maps.LatLng((d.geo.lat), (d.geo.lon)))
			})
			//console.log(locData);
			heatLayer.setData(new maps.MVCArray(locData))
		};
	})
	/* END ====================== Topic Locations ===================== */
}]);