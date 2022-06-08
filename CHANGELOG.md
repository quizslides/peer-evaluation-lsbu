# Changelog

This changelog is auto generated using semantic releases.

## [1.0.0-staging.18](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.17...v1.0.0-staging.18) (2022-06-08)


### Features

* adding flow to calculated marks page ([f9311d4](https://github.com/quizslides/peer-evaluation-lsbu/commit/f9311d4f101ea8e7e9dce6529d009f8dcced9355))
* adding hash to schema.prisma to avoid failing pipeline when there is a new migration ([f98f11e](https://github.com/quizslides/peer-evaluation-lsbu/commit/f98f11ec6f17fde93bc5525f8c90f2591a718706))
* adding migration for isInvalid to isValid on the peer evaluation table ([0f5592a](https://github.com/quizslides/peer-evaluation-lsbu/commit/0f5592a88a35ee9b48ab7d7011a5337d37f3c559))
* increasing timeout to test jobs on the pipeline to 20 minutes ([b8a3afd](https://github.com/quizslides/peer-evaluation-lsbu/commit/b8a3afdb30021176aeb7d554e4ae132d2517c289))


### Bug Fixes

* fixing deleting peer evaluation as admin ([6b1e90e](https://github.com/quizslides/peer-evaluation-lsbu/commit/6b1e90e06ccb53b53cd63046df49928465cb9f73))
* fixing github action template for hashing cache during runtime ([dbef42e](https://github.com/quizslides/peer-evaluation-lsbu/commit/dbef42e956a109d50355104161fc8be8032a503e))
* fixing the expression is not closed as an unescaped ([32b15c0](https://github.com/quizslides/peer-evaluation-lsbu/commit/32b15c0b88f4ec0f7c92f70aadb98157d0160004))

## [1.0.0-staging.17](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.16...v1.0.0-staging.17) (2022-06-08)


### Features

* adding validation for peer evaluation to query the table as a student ([5664624](https://github.com/quizslides/peer-evaluation-lsbu/commit/5664624ad878c129717e1c23fa5f95bd3944316d))


### Bug Fixes

* fixing team name is too long with a max 330 characters for the team name field ([17a3ceb](https://github.com/quizslides/peer-evaluation-lsbu/commit/17a3ceb0bff4b74203b0010abc2485bfea1c762b))

## [1.0.0-staging.16](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.15...v1.0.0-staging.16) (2022-06-07)


### Features

* removing rows by default on comment field and making it to autosize ([06df07a](https://github.com/quizslides/peer-evaluation-lsbu/commit/06df07a087fc538056ee18eea3dbabc0c3ef6fe3))

## [1.0.0-staging.15](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.14...v1.0.0-staging.15) (2022-06-07)


### Features

* adding endpoint and button to calculate marks by request ([083952b](https://github.com/quizslides/peer-evaluation-lsbu/commit/083952b60afc5a3e719ba3ee0c48f1893efda4ed))
* adding page to view results of the peer evaluation of the team ([448ff55](https://github.com/quizslides/peer-evaluation-lsbu/commit/448ff556295d78afeccc291eb0aab1ee2e44808d))
* adding Peer Evaluation Student URL to peer evaluation dashboard ([5b7a2f6](https://github.com/quizslides/peer-evaluation-lsbu/commit/5b7a2f68d97650d49c0a2a5897e06a1bfe8bc1bf))


### Bug Fixes

* adding component to reset formik state when data of the form has been updated ([96ae6ee](https://github.com/quizslides/peer-evaluation-lsbu/commit/96ae6ee79a9cf951f1a3de9388cf68b4f0230da5))
* adding ssr to session to fix refetching to backend unnecessarily ([979c4b4](https://github.com/quizslides/peer-evaluation-lsbu/commit/979c4b4b893c91adf5eb7344d3683e3262ff831d))
* fixing deleting peer evaluation as admin ([2de452e](https://github.com/quizslides/peer-evaluation-lsbu/commit/2de452e72b849d8ef783f13401ec516346e02295))

## [1.0.0-staging.14](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.13...v1.0.0-staging.14) (2022-06-05)


### Bug Fixes

* removing pagination from peer evaluation table ([cf2b9bb](https://github.com/quizslides/peer-evaluation-lsbu/commit/cf2b9bb73b209d6b5b32db8a4e150d401c7b4b8a))


### Code Refactoring

* renaming results on students table to peer evaluation ([7041c12](https://github.com/quizslides/peer-evaluation-lsbu/commit/7041c123dc50290210121c88184db5ea177f12c4))

## [1.0.0-staging.13](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.12...v1.0.0-staging.13) (2022-06-05)


### Bug Fixes

* adding myself to peer evaluation student table ([d6bf068](https://github.com/quizslides/peer-evaluation-lsbu/commit/d6bf06834d34825bc09b36b7b5d3172ed6b3ec91))
* adding pagination to table of teams and students ([f32981a](https://github.com/quizslides/peer-evaluation-lsbu/commit/f32981a81989be73e48fd74d9fbeeb88dce1affe))
* adding pagination to tables with default of 10 ([5216a95](https://github.com/quizslides/peer-evaluation-lsbu/commit/5216a9595353863eb5c389d4a19034cfdcff872d))
* adding pool to smpt conneciton ([8ea03a2](https://github.com/quizslides/peer-evaluation-lsbu/commit/8ea03a25fb837be56829c999b5f948450ac3a6c3))
* adding smtp pool to email transport ([6b63437](https://github.com/quizslides/peer-evaluation-lsbu/commit/6b634372a004b319b789eb10fb9af658e016b7b6))
* fixing wrong redirect to total teaching member ([03340ee](https://github.com/quizslides/peer-evaluation-lsbu/commit/03340eef209afb97d9caeccc818ee37fadbe6025))

## [1.0.0-staging.12](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.11...v1.0.0-staging.12) (2022-06-03)


### Features

* adding view only of peer evaluation to lecturer ([c1c71fd](https://github.com/quizslides/peer-evaluation-lsbu/commit/c1c71fdd0ab1a8d31eebb200a387472f8a1327b7))


### Bug Fixes

* adding to close connection to smpt to avoid collapsing the smtp pool ([a897f18](https://github.com/quizslides/peer-evaluation-lsbu/commit/a897f188e9fd4f7ffd604b1b187c656a02b6e899))
* removing status from student result page as it is not defined ([0d4dd91](https://github.com/quizslides/peer-evaluation-lsbu/commit/0d4dd910584ab1a8f7ff5192a4c1b958bebe335a))

## [1.0.0-staging.11](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.10...v1.0.0-staging.11) (2022-06-03)


### Features

* adding component to avoid closing the tab when unsaved fork ([3c882c1](https://github.com/quizslides/peer-evaluation-lsbu/commit/3c882c1085768d221725b6fa71405e446b0b63a7))
* adding student name to the peer evaluation to handle student name ([4a53b4a](https://github.com/quizslides/peer-evaluation-lsbu/commit/4a53b4a248cb773e8dd327bc66290368662bd73a))
* adding WarningUnsavedForm to all forms on the peer evaluation ([337736e](https://github.com/quizslides/peer-evaluation-lsbu/commit/337736e03818a5786ef3f64a145d3e804abb9231))

## [1.0.0-staging.10](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.9...v1.0.0-staging.10) (2022-06-03)


### Bug Fixes

* adding query to student list by user id and peer evaluation id ([6c1eda5](https://github.com/quizslides/peer-evaluation-lsbu/commit/6c1eda5a291601ec8f17cae7041d7df262290dab))

## [1.0.0-staging.9](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.8...v1.0.0-staging.9) (2022-06-03)


### Features

* adding a migration for isInvalid to the whole reviewee by each student ([0f8ed60](https://github.com/quizslides/peer-evaluation-lsbu/commit/0f8ed60903d7bbb5712adbdac376d3c68975fbd4))
* adding a orderBy to get always the same response from the backend ([edef851](https://github.com/quizslides/peer-evaluation-lsbu/commit/edef85169ba4cb0cdd262b035f6bd26ff1f6104f))
* adding backend query for student peer evaluation table ([984c9df](https://github.com/quizslides/peer-evaluation-lsbu/commit/984c9df601ce5b7f32b2e056d45953d519dc046e))
* adding delete on cascade to Peer Evaluation records ([6954742](https://github.com/quizslides/peer-evaluation-lsbu/commit/6954742fd5f77a0cf7ec16eef06df102b1b8542b))
* adding delete peer evaluation student team ([b535d8b](https://github.com/quizslides/peer-evaluation-lsbu/commit/b535d8b08b62cd86db1d4082d17952fb44bec2a4))
* adding feature to update final mark depending on the lecturer adjusted mark set ([edb30c5](https://github.com/quizslides/peer-evaluation-lsbu/commit/edb30c5c71be449a4cdd4c3b3dfb4e4fb8b5329a))
* adding migration of isInvalid to PeerEvaluationReviewee ([c46a934](https://github.com/quizslides/peer-evaluation-lsbu/commit/c46a934079a1d4a3bfbbdb9e3b8181aee5bfdcaa))
* adding peer evaluation save api to backend ([752ea04](https://github.com/quizslides/peer-evaluation-lsbu/commit/752ea049f3e304c653be85cc078c2f4030f6c8b2))
* adding reviewers peer evaluation table data on students creation ([fab8f9a](https://github.com/quizslides/peer-evaluation-lsbu/commit/fab8f9ad5e8ab81f7c52844479d9e3777b514db5))
* Adding students page where a student can evaluate other peers ([3b1a6f2](https://github.com/quizslides/peer-evaluation-lsbu/commit/3b1a6f2afcbc8d9b44bd58d8119687b22cb5d41c))
* adding team linking to peer evaluation object ([d71cea8](https://github.com/quizslides/peer-evaluation-lsbu/commit/d71cea830ea6b42288b20c69927fa853cf3c7314))
* adding team report mark update and mark calculation ([182ef1b](https://github.com/quizslides/peer-evaluation-lsbu/commit/182ef1b79435346ce03cda498d146961c91af9f4))
* adding transformer to pel code ([aa1de56](https://github.com/quizslides/peer-evaluation-lsbu/commit/aa1de56659f45e5c69df1d064e02c1c302a5869d))
* adding view of student peer evaluation table ([0cc87e4](https://github.com/quizslides/peer-evaluation-lsbu/commit/0cc87e4679b9261815f06d073d087bf2a8f50d48))
* pulling data of student peer evaluation table ([f29233c](https://github.com/quizslides/peer-evaluation-lsbu/commit/f29233cd8c0ab10912a55065b42c6ff37db4f118))


### Bug Fixes

* adding dependancy to react hooks ([4109934](https://github.com/quizslides/peer-evaluation-lsbu/commit/4109934ca18e41c52fdfef963abe5dc2ce0253bf))
* adding read only to final mark of student to viewer teaching member ([d761eed](https://github.com/quizslides/peer-evaluation-lsbu/commit/d761eed337effacf7d1642adcfeff2d7e4e67ef1))
* fix definition of column data table for student peer evaluation ([f0966d4](https://github.com/quizslides/peer-evaluation-lsbu/commit/f0966d4ea1e1f58a4832f630c9569df5ed6eb882))
* fix missing dependancy of next-auth for v4.3.4 ([81f36d3](https://github.com/quizslides/peer-evaluation-lsbu/commit/81f36d3be850771fed642ca324dc790b0260519e))
* fix querying the peer evaluation data of a student ([b320965](https://github.com/quizslides/peer-evaluation-lsbu/commit/b320965e5da46d8f02b0346d37571c21b18e0247))
* fix saving final mark and lecturer adjusted mark ([5f75533](https://github.com/quizslides/peer-evaluation-lsbu/commit/5f755335f9f1c81066909dfaca873ef6a80967d9))
* fix to avoid reset form component when windows focus changes ([70bae79](https://github.com/quizslides/peer-evaluation-lsbu/commit/70bae7982859cc8c238412684e5acc79f18e386a))
* fixing count of completed peer evaluations on the peer evaluation dashboard ([e750d34](https://github.com/quizslides/peer-evaluation-lsbu/commit/e750d3435c52dedb19d8f71c18b343b0d55ac4cc))
* fixing criteria score component ([d79bd25](https://github.com/quizslides/peer-evaluation-lsbu/commit/d79bd2565dd0b7441e567600822282e61aeaeade))
* fixing endpoint for calculation results of team of the peer evaluation ([0221d86](https://github.com/quizslides/peer-evaluation-lsbu/commit/0221d86a694b3d36c8702780185ac2243ce3f78e))
* fixing initial error on peer evaluation state for null fields ([dd437f1](https://github.com/quizslides/peer-evaluation-lsbu/commit/dd437f1c9ac2de796e9cba1a63197ffd6ca4fd16))
* fixing normalize objects from objects of array ([e636fbf](https://github.com/quizslides/peer-evaluation-lsbu/commit/e636fbf21f3cc3f77076934825ce02e3c65bd8bc))
* fixing pulling data for the mark calculations ([7411817](https://github.com/quizslides/peer-evaluation-lsbu/commit/74118173d6bbeb133ce1b82bd63f1235428a2693))
* fixing quering students data when multiple peer evaluation are part of the user ([064e70a](https://github.com/quizslides/peer-evaluation-lsbu/commit/064e70a7a0a5f024d0c9856b40c05b2dc873b1a2))
* fixing saving comment of reviewee ([fb405c2](https://github.com/quizslides/peer-evaluation-lsbu/commit/fb405c23679671152af169b7656d769e83d7b9b8))
* fixing upsertPeerEvaluationTableLecturer error creating bulk students and teams ([09ba19f](https://github.com/quizslides/peer-evaluation-lsbu/commit/09ba19f41121988d99fcc4d734cdae155fabbc3b))
* removing space from the example csv of the student email ([6f52202](https://github.com/quizslides/peer-evaluation-lsbu/commit/6f522029e8c6245dc19785edd0a8dec637a98405))
* renaming criteria score to criteriaScoreTotal of the student reviewed ([942d966](https://github.com/quizslides/peer-evaluation-lsbu/commit/942d96665b04724e34ddc2575399ea3354ac554d))


### Code Refactoring

* removing ID from student teams table ([e3a39a7](https://github.com/quizslides/peer-evaluation-lsbu/commit/e3a39a795c4f46edb7ec533b3f735f33313eef7b))
* renaming mark to final mark and adding sql migration ([dfc4521](https://github.com/quizslides/peer-evaluation-lsbu/commit/dfc45219436f05f487feb458087ccb45e8b66f0e))
* updating code for next build ([c1fb1b3](https://github.com/quizslides/peer-evaluation-lsbu/commit/c1fb1b3d2c570016ae112ac1269bcc1a1cbeded6))

## [1.0.0-staging.8](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.7...v1.0.0-staging.8) (2022-05-08)


### Features

* adding peer evaluation dashboard ([81466b9](https://github.com/quizslides/peer-evaluation-lsbu/commit/81466b9d99c6e37b4ae0d17ac85646c779496f1d))
* adding resolver for peer evaluation dashboard ([604afb2](https://github.com/quizslides/peer-evaluation-lsbu/commit/604afb2cab1e91e2594d915e6ee5c46506e3702c))
* adding total peer evaluation teams to the resolver ([365d8c5](https://github.com/quizslides/peer-evaluation-lsbu/commit/365d8c5cd38e2f82582039f3b2d942c793db93a2))

## [1.0.0-staging.7](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.6...v1.0.0-staging.7) (2022-04-03)


### Bug Fixes

* fixing dockerfile configuration ([1f083aa](https://github.com/quizslides/peer-evaluation-lsbu/commit/1f083aa0ec3dbc88ae531c05d7683d5b65cc2d23))

## [1.0.0-staging.6](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.5...v1.0.0-staging.6) (2022-04-03)


### Features

* adding 404 and 500 pages ([8167a1d](https://github.com/quizslides/peer-evaluation-lsbu/commit/8167a1dff7abc409839508e888cd2f470542871e))
* adding checking on real-time module code ([e03f41f](https://github.com/quizslides/peer-evaluation-lsbu/commit/e03f41fa4b5261e59d010f154b4748efc860027f))
* adding cmd to reset prod db ([8f3bd64](https://github.com/quizslides/peer-evaluation-lsbu/commit/8f3bd6438ca698f54104ad19318c2be8fc2a2164))
* adding CRUD for a lecturer with only view permissions and editor ([3d8b5df](https://github.com/quizslides/peer-evaluation-lsbu/commit/3d8b5dfb6760babe96bc3aa39793504f4db059a5))
* adding edit, delete module route ([412c124](https://github.com/quizslides/peer-evaluation-lsbu/commit/412c12499a596ad7608abf8e4e6739122f950241))
* adding error on auth page ([9d7bee2](https://github.com/quizslides/peer-evaluation-lsbu/commit/9d7bee2f94a0fe64323264d9025267261e4e8a81))
* adding granular permission for admin, lecturer and module teaching member role ([6a59c4b](https://github.com/quizslides/peer-evaluation-lsbu/commit/6a59c4b9c9d5e8b2bb519c94dc3d49333c0f0142))
* adding user id to auth context ([ad15791](https://github.com/quizslides/peer-evaluation-lsbu/commit/ad157910051fbee061e200bc6bfd612a2272bf44))
* improving error on auth to handle when user is logged in ([be75e69](https://github.com/quizslides/peer-evaluation-lsbu/commit/be75e69e4c560da2bf855f844f825284c5ec7562))


### Bug Fixes

* adding mock of fetch to run on jest apollo client ([3d5b161](https://github.com/quizslides/peer-evaluation-lsbu/commit/3d5b161c23b54ef6c7ba5dd8e4374017002e8266))
* fixing bug on yup validation async ([9dd76c7](https://github.com/quizslides/peer-evaluation-lsbu/commit/9dd76c785080a1fdf2d7f1cef49cb85d2c41e31a))
* fixing deleting modules as admin with module container view ([e5f7dd7](https://github.com/quizslides/peer-evaluation-lsbu/commit/e5f7dd7b7bd51294caaaade81d4340f4494a30f8))
* fixing number update fields casted as string ([3a9f991](https://github.com/quizslides/peer-evaluation-lsbu/commit/3a9f9911a9af84ba942e36a961ade0031bf4ff84))
* fixing regex for module code ([97357ba](https://github.com/quizslides/peer-evaluation-lsbu/commit/97357bac0594fe1ecd810c38609cb65d761a6af0))
* fixing table add icon tooltip ([74a5b72](https://github.com/quizslides/peer-evaluation-lsbu/commit/74a5b72fd3c160176037935b842d0c3bea3ed0a0))
* fixing typo on peer evaluation table when is empty ([6117227](https://github.com/quizslides/peer-evaluation-lsbu/commit/61172277c5266fcf7c6e245ebe646d6227f44ee4))
* remove the your account expandable menu ([5cc488f](https://github.com/quizslides/peer-evaluation-lsbu/commit/5cc488ffc7ae51e523b600f102c971e0fca2b2e5))


### Code Refactoring

* adding migration of renaming module to peer evaluation ([6520c51](https://github.com/quizslides/peer-evaluation-lsbu/commit/6520c5178e4cd24b4ceb295102c98f73b6804db4))
* refactoring dockerfile cleaner structure ([204ee5c](https://github.com/quizslides/peer-evaluation-lsbu/commit/204ee5c3d2ce7c02e5a2db3add0e1e326fe19f35))
* refactoring module container as it is reused by multiple pages ([12a705e](https://github.com/quizslides/peer-evaluation-lsbu/commit/12a705ef8e4a0427e7278584d8d29bacf9ca7432))
* removing console.log in moduleCodeValidator ([beb9622](https://github.com/quizslides/peer-evaluation-lsbu/commit/beb9622746c15ce31192f44c04bfdef15aa3549b))
* removing unused imports and variables ([6949543](https://github.com/quizslides/peer-evaluation-lsbu/commit/6949543240221b6410af92b432d693811ba2977a))
* renaming module member to module teaching member ([9158116](https://github.com/quizslides/peer-evaluation-lsbu/commit/91581162a3eb38ef146a97ed7a8834d350c6465b))
* renaming module to peer evaluation ([723f5a5](https://github.com/quizslides/peer-evaluation-lsbu/commit/723f5a5ec0f1fec78d3bb1b8deb0312afeeed705))

## [1.0.0-staging.5](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.4...v1.0.0-staging.5) (2022-03-17)


### Features

* adding check module member editing constraint ([e701295](https://github.com/quizslides/peer-evaluation-lsbu/commit/e7012959e0421f83656140435d9aff4fe1129567))
* adding create module container and refactoring ([ea239ca](https://github.com/quizslides/peer-evaluation-lsbu/commit/ea239cac1bd475446a17faa5ca4c2e08967cdb0e))
* adding custom column management and wysiwyg module ([8490599](https://github.com/quizslides/peer-evaluation-lsbu/commit/849059978c08512dd660359140d0b7aca1c8991d))
* adding field status to module members ([3db95b7](https://github.com/quizslides/peer-evaluation-lsbu/commit/3db95b7e88636dad8b8171064d74a5ef2446548a))
* adding module member operations of a module ([d8933e9](https://github.com/quizslides/peer-evaluation-lsbu/commit/d8933e94012269ee449c3efc40a56f5170fd4d75))
* adding module peer evaluation migration ([de6e650](https://github.com/quizslides/peer-evaluation-lsbu/commit/de6e65059956fee96ea7abdd3b7ed3c77630fda5))
* getting only LECTURER for the module members dropdown list ([31ec290](https://github.com/quizslides/peer-evaluation-lsbu/commit/31ec29000152035a89ac70a56853bf40932287a5))
* sign out as top item menu ([d348175](https://github.com/quizslides/peer-evaluation-lsbu/commit/d3481757f3648e3909a904e171704d80c3dcfd33))
* updating sign in message with more informationn ([213e979](https://github.com/quizslides/peer-evaluation-lsbu/commit/213e979bdffcfe1942cc09b7dce427c1cdc4c067))
* wip: adding schema of the user, module and module members ([e486a4b](https://github.com/quizslides/peer-evaluation-lsbu/commit/e486a4ba9cd761254677b62f0e12920373b54671))


### Bug Fixes

* adding a fix for SSR for the WYSIWYG ([0e6087c](https://github.com/quizslides/peer-evaluation-lsbu/commit/0e6087c6d2e0e3a5b36a97e49fa7adc49acab113))
* adding white space after the email ([ade4246](https://github.com/quizslides/peer-evaluation-lsbu/commit/ade4246b929d3286736e7d90bb5169959f20fe2b))
* fixing migration deleting wrong unique constraint ([4c581de](https://github.com/quizslides/peer-evaluation-lsbu/commit/4c581deffe24114836db5efc26e04918566fc8a8))
* fixing missing imports for production ([5b42fd2](https://github.com/quizslides/peer-evaluation-lsbu/commit/5b42fd2b912e39647d0047561fd568cbe40742ae))


### Code Refactoring

* removing old gh action workflow ([0dd9457](https://github.com/quizslides/peer-evaluation-lsbu/commit/0dd94579f8410ba593ff9a4eb92e9817d0289d4b))
* updating email body variable to peerEvaluationUrl ([357c453](https://github.com/quizslides/peer-evaluation-lsbu/commit/357c453ea8b5db22417af38ff54b2b99ebe31046))

## [1.0.0-staging.4](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.3...v1.0.0-staging.4) (2022-03-06)


### Features

* adding create and updated field to user schema ([e779ab9](https://github.com/quizslides/peer-evaluation-lsbu/commit/e779ab947875b81a28a05df70494de45377cffd1))


### Bug Fixes

* fix auth redirect URL for staging environment ([7d607e8](https://github.com/quizslides/peer-evaluation-lsbu/commit/7d607e81441aad24fcca3872ca15432efbbcd3a7))
* removing bash slash of routing on sign in ([9c4bd49](https://github.com/quizslides/peer-evaluation-lsbu/commit/9c4bd497b00ff45e97ddcc5b3a71e8f2b602aa73))
* updating sentry environment for the banckend ([b0e7be7](https://github.com/quizslides/peer-evaluation-lsbu/commit/b0e7be794c18aae02538c8b9e5c2c495d8699fc2))

## [1.0.0-staging.3](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.2...v1.0.0-staging.3) (2022-03-06)


### Bug Fixes

* adding [@lsbupeerevaluation](https://github.com/lsbupeerevaluation).software and [@lsbu](https://github.com/lsbu).ac.uk in addition to [@gmail](https://github.com/gmail).com to create account ([01aef71](https://github.com/quizslides/peer-evaluation-lsbu/commit/01aef717f5d69436d66c6d31119e07c4250b1f6a))

## [1.0.0-staging.2](https://github.com/quizslides/peer-evaluation-lsbu/compare/v1.0.0-staging.1...v1.0.0-staging.2) (2022-03-06)


### Features

* adding seed for live environments using real email ([e71ef1c](https://github.com/quizslides/peer-evaluation-lsbu/commit/e71ef1c0218cc91e631ad87e0c17056dc89e3d3b))

## 1.0.0-staging.1 (2022-03-06)


### Features

* adding admin users page ([f6b9dc5](https://github.com/quizslides/peer-evaluation-lsbu/commit/f6b9dc54690e74a46c1b5d1cea57d906d4d722c9))
* adding any rule to eslint ([770fd02](https://github.com/quizslides/peer-evaluation-lsbu/commit/770fd028dff4ccee239b7b32182db9f0ce7f8c2e))
* adding apollo server for the backend with grasphql and typegraphql ([05d4b17](https://github.com/quizslides/peer-evaluation-lsbu/commit/05d4b1716e69e61c163b4aa16cd04d4df3602045))
* adding auth provider ([22e7dd7](https://github.com/quizslides/peer-evaluation-lsbu/commit/22e7dd775805fe66861623d73bbdb09683b0d20c))
* adding check and close icon ([6ab0b97](https://github.com/quizslides/peer-evaluation-lsbu/commit/6ab0b97e54d47b1e4977291bb94739170f6949fb))
* adding components with unit test ([1672e83](https://github.com/quizslides/peer-evaluation-lsbu/commit/1672e833b3727e075faa3502dfa2fec4c26070dc))
* adding containers auth, loading and unauthorised and helpbutton and routing ([a45c28d](https://github.com/quizslides/peer-evaluation-lsbu/commit/a45c28ddd722d3f2e845bf2f53c115583c366c6c))
* adding cypress for E2E and integration tests ([34a6dd3](https://github.com/quizslides/peer-evaluation-lsbu/commit/34a6dd3af341799639ddbe2048a212dd589dff6c))
* adding deployment configuration ([3512ee3](https://github.com/quizslides/peer-evaluation-lsbu/commit/3512ee32e26c6d82f6996de15be775bbee1037d3))
* adding email service ([34e0205](https://github.com/quizslides/peer-evaluation-lsbu/commit/34e0205e8d24bbbc5bbfb2ecedfcd9126f882508))
* adding email service dockerised for local development ([15e8c23](https://github.com/quizslides/peer-evaluation-lsbu/commit/15e8c23d2e1d2f3c4a0ce7fe1a4d96294c489871))
* adding email templates ([f733fec](https://github.com/quizslides/peer-evaluation-lsbu/commit/f733fecba78761f1dda839c77a5225e621875db0))
* adding entry point, error handler, 500 and homepage ([cd25826](https://github.com/quizslides/peer-evaluation-lsbu/commit/cd258262e50d03eaf318e4c13e68b83873811058))
* adding error container ([7356e70](https://github.com/quizslides/peer-evaluation-lsbu/commit/7356e70b6022980dea1e9ed27da6fdbeb356628d))
* adding example for user upload ([a59e4aa](https://github.com/quizslides/peer-evaluation-lsbu/commit/a59e4aa9349b2772f877c8dff76dc7ea7040f3a9))
* adding fetcher for the api ([d9f03f4](https://github.com/quizslides/peer-evaluation-lsbu/commit/d9f03f43b2b9e527edeae88a85229476c49b1342))
* adding gh actions workflow for release and tests ([41a26f2](https://github.com/quizslides/peer-evaluation-lsbu/commit/41a26f2ade8465526baa09f9f16aec12702e765f))
* adding graphql queries for user with hooks ([648565a](https://github.com/quizslides/peer-evaluation-lsbu/commit/648565ab336301133ebf9452605b02fac5ef7975))
* adding icons with unit test ([255d667](https://github.com/quizslides/peer-evaluation-lsbu/commit/255d6677a0b3eff23803625f457cf8f8849020b8))
* adding jest for automated test ([d5ab4bb](https://github.com/quizslides/peer-evaluation-lsbu/commit/d5ab4bba2e3ec9b2c3198e5a022946c3c0477e00))
* adding logger ([7cfb022](https://github.com/quizslides/peer-evaluation-lsbu/commit/7cfb022815eeb5b0cb46e2389176844125517155))
* adding mui as ui framework ([2d5356b](https://github.com/quizslides/peer-evaluation-lsbu/commit/2d5356bd08fa7b0b7b823ecb9feb0bf53e4e228c))
* adding navigation menu with scope by roles ([afcbc64](https://github.com/quizslides/peer-evaluation-lsbu/commit/afcbc6421c877a081583f8b6f7fadb685188d1d9))
* adding new select component ([780ef65](https://github.com/quizslides/peer-evaluation-lsbu/commit/780ef6508c2b0acdd9eb5e0f373316d03472a5ea))
* adding notifications handler ([d537c6c](https://github.com/quizslides/peer-evaluation-lsbu/commit/d537c6c3ebcf4041e761fdccd4aff1e0313ebd2e))
* adding passwordless auth ([bcf40c4](https://github.com/quizslides/peer-evaluation-lsbu/commit/bcf40c47fe8b4895d04d0877747c83ca0ce03dd1))
* adding permissions, roles, hooks and server config ([2baa2ee](https://github.com/quizslides/peer-evaluation-lsbu/commit/2baa2eec5782ed211140e4267d5bdfc3304fd601))
* adding prisma orm ([ca3dac7](https://github.com/quizslides/peer-evaluation-lsbu/commit/ca3dac70afd8389ca83531ddc505d36850fd8f67))
* adding process env variables definitions ([750dee1](https://github.com/quizslides/peer-evaluation-lsbu/commit/750dee1cf9ec4f997369a3389455b29a96ae289e))
* adding role migration for prisma ([cd85800](https://github.com/quizslides/peer-evaluation-lsbu/commit/cd85800ecd66da14d16b2dcbf785dce9b467c271))
* adding role to next-auth object ([e72174a](https://github.com/quizslides/peer-evaluation-lsbu/commit/e72174a030a2d2f46991a6bac638b68e15fc9f1e))
* adding semantic releases ([e634f43](https://github.com/quizslides/peer-evaluation-lsbu/commit/e634f43754b2d38ecb8a3dd182490ae8aeac5951))
* adding semantic-releases to the ci ([8b4aafc](https://github.com/quizslides/peer-evaluation-lsbu/commit/8b4aafcae39511167a42424ea0f1d17ca42abbcd))
* adding sentry for development ([f972c22](https://github.com/quizslides/peer-evaluation-lsbu/commit/f972c2297a5ea7ff7f6d93998267b5784e0a5683))
* adding theme with breakpoints ([87e8a33](https://github.com/quizslides/peer-evaluation-lsbu/commit/87e8a3318c6d6ce179e79f533ef0cb4a894ed55b))
* adding unauthorized, help, dashboard and playground page ([0189536](https://github.com/quizslides/peer-evaluation-lsbu/commit/018953655c320bd2931f2dd348d86ab10e70917b))
* adding variable text ([169c93d](https://github.com/quizslides/peer-evaluation-lsbu/commit/169c93dbf4e39829daecdfd09dd0bc64deb6d67a))
* creating dockerised PostgreSQL configuration ([4489211](https://github.com/quizslides/peer-evaluation-lsbu/commit/4489211eff2d46ed4cefa07df716877a12ea39e8))
* improving title component to hadle margin ([908625a](https://github.com/quizslides/peer-evaluation-lsbu/commit/908625a5b75e2458ce28c761be6eb323c6344562))
* pages for sign-in and sign-out ([e0860b2](https://github.com/quizslides/peer-evaluation-lsbu/commit/e0860b23379b49df46282f3362449ded569b52b6))
* permission handler ([65c0755](https://github.com/quizslides/peer-evaluation-lsbu/commit/65c075529e41af247c6a09df9ef038a99971d3f5))
* updating dockerfile, monitoring and deployment documentation ([03a3059](https://github.com/quizslides/peer-evaluation-lsbu/commit/03a3059aa1dc9d0b4a710f934f0f05252857c104))
* updating favicon ([a4c74b5](https://github.com/quizslides/peer-evaluation-lsbu/commit/a4c74b55d9ded9c26e6c956d8ab637fda79cd88e))
* updating global types ([06a30e7](https://github.com/quizslides/peer-evaluation-lsbu/commit/06a30e7add2d616f5c976ff08234604e95e2ada1))
* updating node to v16 ([691f070](https://github.com/quizslides/peer-evaluation-lsbu/commit/691f070381651cdf30a66713b54f0b803489d2a8))
* updating sentry to new project using google workspace ([48d3731](https://github.com/quizslides/peer-evaluation-lsbu/commit/48d3731058bae1e7df4e8b0d1f0ac5801ce2affb))
* user admin page ([9f70295](https://github.com/quizslides/peer-evaluation-lsbu/commit/9f7029584e25fdcd4423309c26792d2659f4a6c7))


### Bug Fixes

* adding type to UploadButton component ([b566e9c](https://github.com/quizslides/peer-evaluation-lsbu/commit/b566e9c7ea4e6d1fab3c7b12558760c9c1a42d03))
* deleting errorLogger from seed.ts due to tsconfig conflict ([e39c828](https://github.com/quizslides/peer-evaluation-lsbu/commit/e39c828247419fff3200a8fd0f7ba84d1de86aec))
* fixing bug on gh template gh ([8d6aadf](https://github.com/quizslides/peer-evaluation-lsbu/commit/8d6aadfc2b0422ab848c1a22e0a82215ab5ce98b))
* fixing flow of pipeline ([bc8a632](https://github.com/quizslides/peer-evaluation-lsbu/commit/bc8a632801a9f5f1a3cce003e0b089631df1fd5f))
* fixing missing test-id for components ([e5af5c7](https://github.com/quizslides/peer-evaluation-lsbu/commit/e5af5c7d1d123bbe47743ee5fec11b08203960ed))
* fixing prettier not working lint staged ([a857cac](https://github.com/quizslides/peer-evaluation-lsbu/commit/a857cacd9869569429a0ff8ef2fd4c55cbbc25e1))
* found unnecessary fragments and fixed it ([5f7ce66](https://github.com/quizslides/peer-evaluation-lsbu/commit/5f7ce66c6bdbb4211979b86956929180004fddf6))
* next-auth not picking up NEXTAUTH_SECRET unless added as init on the client ([2bef43e](https://github.com/quizslides/peer-evaluation-lsbu/commit/2bef43e2ff36ee4dd9bdc5daaaae9387cb36cae3))
* operands must both be `number`s or `string`s in addition expressions ([ad75df6](https://github.com/quizslides/peer-evaluation-lsbu/commit/ad75df632b73eeaccdb07aebc70621575e1f876d))
* package.json & yarn.lock to reduce vulnerabilities ([592ac3b](https://github.com/quizslides/peer-evaluation-lsbu/commit/592ac3b2b234ef8321722f284ddcbef1984dab3e))
* removing text added by mistake on the loader component ([145ed05](https://github.com/quizslides/peer-evaluation-lsbu/commit/145ed050dfd722fe2d77260dd75ac2a2f2a587d3))
* solving bug fix for apollo dependancies of graphql ([32e28fe](https://github.com/quizslides/peer-evaluation-lsbu/commit/32e28fe3adfa5183d47728037d42a8c30c891a87))
* updating wrong key on package.json ([300f41a](https://github.com/quizslides/peer-evaluation-lsbu/commit/300f41addcb0a25ec837b9824ced5312e781deee))
* upgrade graphql from 15.3.0 to 15.8.0 ([6155e71](https://github.com/quizslides/peer-evaluation-lsbu/commit/6155e71260c742bbd5a30d08ad42823e9e64ab2c))
* upgrade graphql-middleware from 6.0.9 to 6.1.13 ([88b5482](https://github.com/quizslides/peer-evaluation-lsbu/commit/88b54820902967871bf37b7f8c497a0bebdece58))


### Performance Improvements

* adding memoisation ([151e805](https://github.com/quizslides/peer-evaluation-lsbu/commit/151e8053c04a06ca09e8c894cb79805b17fd9902))
* adding memoization for icon components for performance ([5ed7397](https://github.com/quizslides/peer-evaluation-lsbu/commit/5ed73971341866ffd77048e469640290333efa00))


### Reverts

* reverting to PostgreSQL 13.5 for cloud compatibility ([7c98543](https://github.com/quizslides/peer-evaluation-lsbu/commit/7c9854378b3e942146972da792963ee15e115d98))


### Documentation

* adding deepsource badge ([27135fe](https://github.com/quizslides/peer-evaluation-lsbu/commit/27135fe5caf437bfd19962627124e296c4d5b7a4))
* adding documentation to error handler ([38d3f2e](https://github.com/quizslides/peer-evaluation-lsbu/commit/38d3f2e707d9151be07433a7e5877202c931ccf0))
* rEADME update ([348686f](https://github.com/quizslides/peer-evaluation-lsbu/commit/348686f5861d17f07a748eb6579b9fe2f8759e67))
* updating .env.example for development ([1761b9e](https://github.com/quizslides/peer-evaluation-lsbu/commit/1761b9edceaf4bdb5f08be487c4de97d6583817e))


### Code Refactoring

* abstracting shareable component to entry point of the site ([c734c68](https://github.com/quizslides/peer-evaluation-lsbu/commit/c734c6856c35cd5298384f479011c881db1b7fbc))
* adding allow rules to skip in specific scenarios ([737ce93](https://github.com/quizslides/peer-evaluation-lsbu/commit/737ce9367919ed7a35896c20bc0e37e00996cec9))
* adding apollo client as a type declaration ([83deb5d](https://github.com/quizslides/peer-evaluation-lsbu/commit/83deb5db805fbf216a761c5eb03c5e803dd77abf))
* adding guard check for session.user.name ([f31d8d8](https://github.com/quizslides/peer-evaluation-lsbu/commit/f31d8d82d6291696c8967408b4bee246d6d03c13))
* adding memo to containers ([d221318](https://github.com/quizslides/peer-evaluation-lsbu/commit/d221318d269937c78724cf64bfd61db4a75604c3))
* adding rule for react/no-multi-comp and refactoring those failing ([c77ad8a](https://github.com/quizslides/peer-evaluation-lsbu/commit/c77ad8a4967ff1f39c745ab9bea93b19babbfd2e))
* adding rule JSX maximum depth and adding a high threshold ([ae43aef](https://github.com/quizslides/peer-evaluation-lsbu/commit/ae43aef5961efe9422f765ab15a3c7aea3f28f06))
* avoid multiple component definitions per file ([1c9478f](https://github.com/quizslides/peer-evaluation-lsbu/commit/1c9478fb66070660c576c14c2feb8d11c996a919))
* avoid using promises in places not designed to handle them ([0f76439](https://github.com/quizslides/peer-evaluation-lsbu/commit/0f76439ce062ba6647b508731d7d2be69b266649))
* consider adding a `defaultProps` definition ([785301e](https://github.com/quizslides/peer-evaluation-lsbu/commit/785301e876f7564117b5b43bd6ef529dbf7efb01))
* detected empty functions ([0915b4c](https://github.com/quizslides/peer-evaluation-lsbu/commit/0915b4c76015df8b3c3ca5793ca9dba70fc9d3d8))
* detected the use of variables before they are defined ([dd49256](https://github.com/quizslides/peer-evaluation-lsbu/commit/dd492565ba1830acb952a7b7e4ba8c0187b3f569))
* disable jsdoc rule eslint ([139ae9b](https://github.com/quizslides/peer-evaluation-lsbu/commit/139ae9b17b888a67351fb34ce5582de51c882a6c))
* fixing getStaticProps without async ([e95ca66](https://github.com/quizslides/peer-evaluation-lsbu/commit/e95ca660b4fa429ac8ed33cc13795a4296c94b80))
* invalid `async` keyword JS-0376 ([8d46033](https://github.com/quizslides/peer-evaluation-lsbu/commit/8d46033f44a47c0b66dc1eeaffdd17dac6df5c0e))
* minor refactoring to start development ([0a8defc](https://github.com/quizslides/peer-evaluation-lsbu/commit/0a8defc28306d2f6c181ded37825dd2f76cca93c))
* minor refactoring to style props in RenderRow ([61a26dd](https://github.com/quizslides/peer-evaluation-lsbu/commit/61a26ddf6e7c10ceebc25436bf35352e80c5b36d))
* missing default values for non-required properties ([7fa1842](https://github.com/quizslides/peer-evaluation-lsbu/commit/7fa1842e7f50b259962a96fbd97e31ff6ab95869))
* refactor title to enforce return props of type string ([7502049](https://github.com/quizslides/peer-evaluation-lsbu/commit/75020496aaae1c5c29c8162b2c31f00db45d1bd9))
* refactor title types as optional ([465ace1](https://github.com/quizslides/peer-evaluation-lsbu/commit/465ace17bae6ec836637677061ab90d781f98a0a))
* refactorin title adding safe guard to check type and avoid any type pass as props ([c6e39b6](https://github.com/quizslides/peer-evaluation-lsbu/commit/c6e39b6a1a5cdfc5a51e82f8e901ec49cf283583))
* refactoring adding a safe guard as a method ([e1733e5](https://github.com/quizslides/peer-evaluation-lsbu/commit/e1733e53ce9f751d5e564a70913ce0e6d9d54b1f))
* refactoring apollo client type from apollo client object ([e8fd349](https://github.com/quizslides/peer-evaluation-lsbu/commit/e8fd349637d9b774424bb9fe2f95cd6ef1cd3634))
* refactoring auth method ([a59c18e](https://github.com/quizslides/peer-evaluation-lsbu/commit/a59c18ed29a7ec21414fb5d8a207d8242e362573))
* refactoring bad pattern for arrays ([af67cff](https://github.com/quizslides/peer-evaluation-lsbu/commit/af67cff2f35a9876736b47e5d1e0bf7eb8df8976))
* refactoring button component ([484cf01](https://github.com/quizslides/peer-evaluation-lsbu/commit/484cf01b8e49339f014ef92f011dfbe7b25a4f84))
* refactoring components props ([2023bf2](https://github.com/quizslides/peer-evaluation-lsbu/commit/2023bf2c24ddc146a23f841981982567eaa89090))
* refactoring graphql client to apollo client ([adeffb8](https://github.com/quizslides/peer-evaluation-lsbu/commit/adeffb853683935e7e8c5c4e29d3d3a810198455))
* refactoring graphql handler ([d24b305](https://github.com/quizslides/peer-evaluation-lsbu/commit/d24b305360da463d6430ff7479d318b942fe63c9))
* refactoring menu user message ([3fd33be](https://github.com/quizslides/peer-evaluation-lsbu/commit/3fd33be755a80522628516a82808bbb88a868c8b))
* refactoring no bind components ([f34928b](https://github.com/quizslides/peer-evaluation-lsbu/commit/f34928b21e8aa4574867c901d0d267b90a8309a9))
* refactoring of linter rules ([1ddbec5](https://github.com/quizslides/peer-evaluation-lsbu/commit/1ddbec5d4ba8ea26dd90b2af7cb2f47a22aade18))
* refactoring roles enum to standard naming ([da487a3](https://github.com/quizslides/peer-evaluation-lsbu/commit/da487a3c94561ce848154528283aeefb80c5f0b4))
* refactoring TextField name for the TextField ([094822e](https://github.com/quizslides/peer-evaluation-lsbu/commit/094822ec0b56ae73ed1ca22ce08422d705b5e6f9))
* refactoring to function expression ([d522db6](https://github.com/quizslides/peer-evaluation-lsbu/commit/d522db6cd06b08830c271594570a887a95c50e05))
* refactoring types as interface as Title and Wrapper are method objects ([342c86f](https://github.com/quizslides/peer-evaluation-lsbu/commit/342c86faed33c7562c5401678490ddcd4974bdc1))
* removing optional from button variant ([3141d04](https://github.com/quizslides/peer-evaluation-lsbu/commit/3141d04e4d5b531b9573c928905d863b0bbb0005))
* removing unnecessary fragments ([d8d0442](https://github.com/quizslides/peer-evaluation-lsbu/commit/d8d0442665343dffdedaa930a24192376230e1e7))
* removing unused error variable ([136860f](https://github.com/quizslides/peer-evaluation-lsbu/commit/136860f6212c4aef021cb3f25e2ca1987955527b))
* replacing AUTH_SECRET with NEXTAUTH_SECRET ([38dcf24](https://github.com/quizslides/peer-evaluation-lsbu/commit/38dcf24df2f12072631426991ee03558f578352e))
* replacing js to ts error handler for sentry ([2c93f65](https://github.com/quizslides/peer-evaluation-lsbu/commit/2c93f6598f398901149b638043dc771338d144e3))
* reverting to arrow function ([0a3a8fd](https://github.com/quizslides/peer-evaluation-lsbu/commit/0a3a8fd1725d2537c9f908831c4103d2705780d6))
* updating button component ([7e48192](https://github.com/quizslides/peer-evaluation-lsbu/commit/7e48192da684c316283eddf048cd698d1d2ce59f))
* updating content path for pages ([2948c22](https://github.com/quizslides/peer-evaluation-lsbu/commit/2948c22f4429f1930194b7f6431961da9a55db10))
* updating form validator and sign in page ([0182add](https://github.com/quizslides/peer-evaluation-lsbu/commit/0182add46ccbd427d597b1cb7db84afaf63037a9))
* updating role type ([160761b](https://github.com/quizslides/peer-evaluation-lsbu/commit/160761b4a1ca39dcad3909d4a97c1646c35a4b3c))
* updating text field for formik ([20d0f5c](https://github.com/quizslides/peer-evaluation-lsbu/commit/20d0f5cc2fc979e6e9d303c8edcf799da69c70c1))
* updating utils main export ([e509389](https://github.com/quizslides/peer-evaluation-lsbu/commit/e509389597200c0b74dd453742775000db160422))
* use `const` declarations for variables that are never reassigned ([a95ca61](https://github.com/quizslides/peer-evaluation-lsbu/commit/a95ca61b4e582e8ded94245236712b1278d7a654))
