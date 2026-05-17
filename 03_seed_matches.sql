-- ==========================================================================
-- 03 - SEED ALL 104 MATCHES OF WORLD CUP 2026
-- ==========================================================================
-- 72 group matches + 16 R32 + 8 R16 + 4 QF + 2 SF + 1 third + 1 final
-- Times in UTC. EDT = UTC-4 in June/July.
-- Source: official FIFA / Yahoo Sports
-- ==========================================================================

-- ===== GROUP A =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
( 1, 'group', 'A', 1, 'MEX', 'RSA', 'Estadio Azteca (Mexico City)',        '2026-06-11T19:00:00Z'),
( 2, 'group', 'A', 2, 'KOR', 'CZE', 'Estadio Akron (Guadalajara)',          '2026-06-12T02:00:00Z'),
( 3, 'group', 'A', 3, 'CZE', 'RSA', 'Mercedes-Benz Stadium (Atlanta)',      '2026-06-18T16:00:00Z'),
( 4, 'group', 'A', 4, 'MEX', 'KOR', 'Estadio Akron (Guadalajara)',          '2026-06-19T01:00:00Z'),
( 5, 'group', 'A', 5, 'CZE', 'MEX', 'Estadio Azteca (Mexico City)',         '2026-06-25T01:00:00Z'),
( 6, 'group', 'A', 6, 'RSA', 'KOR', 'Estadio BBVA (Monterrey)',             '2026-06-25T01:00:00Z');

-- ===== GROUP B =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
( 7, 'group', 'B', 1, 'CAN', 'BIH', 'BMO Field (Toronto)',                  '2026-06-12T19:00:00Z'),
( 8, 'group', 'B', 2, 'QAT', 'SUI', 'Levi''s Stadium (Santa Clara)',        '2026-06-13T19:00:00Z'),
( 9, 'group', 'B', 3, 'SUI', 'BIH', 'SoFi Stadium (Inglewood)',             '2026-06-18T19:00:00Z'),
(10, 'group', 'B', 4, 'CAN', 'QAT', 'BC Place (Vancouver)',                 '2026-06-18T22:00:00Z'),
(11, 'group', 'B', 5, 'SUI', 'CAN', 'BC Place (Vancouver)',                 '2026-06-24T19:00:00Z'),
(12, 'group', 'B', 6, 'BIH', 'QAT', 'Lumen Field (Seattle)',                '2026-06-24T19:00:00Z');

-- ===== GROUP C =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(13, 'group', 'C', 1, 'BRA', 'MAR', 'MetLife Stadium (East Rutherford)',    '2026-06-13T22:00:00Z'),
(14, 'group', 'C', 2, 'HAI', 'SCO', 'Gillette Stadium (Foxboro)',           '2026-06-14T01:00:00Z'),
(15, 'group', 'C', 3, 'SCO', 'MAR', 'Gillette Stadium (Foxboro)',           '2026-06-19T22:00:00Z'),
(16, 'group', 'C', 4, 'BRA', 'HAI', 'Lincoln Financial Field (Philadelphia)','2026-06-20T00:30:00Z'),
(17, 'group', 'C', 5, 'SCO', 'BRA', 'Hard Rock Stadium (Miami)',            '2026-06-24T22:00:00Z'),
(18, 'group', 'C', 6, 'MAR', 'HAI', 'Mercedes-Benz Stadium (Atlanta)',      '2026-06-24T22:00:00Z');

-- ===== GROUP D =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(19, 'group', 'D', 1, 'USA', 'PAR', 'SoFi Stadium (Inglewood)',             '2026-06-13T01:00:00Z'),
(20, 'group', 'D', 2, 'AUS', 'TUR', 'BC Place (Vancouver)',                 '2026-06-13T04:00:00Z'),
(21, 'group', 'D', 3, 'USA', 'AUS', 'Lumen Field (Seattle)',                '2026-06-19T19:00:00Z'),
(22, 'group', 'D', 4, 'TUR', 'PAR', 'Levi''s Stadium (Santa Clara)',        '2026-06-20T03:00:00Z'),
(23, 'group', 'D', 5, 'TUR', 'USA', 'SoFi Stadium (Inglewood)',             '2026-06-26T02:00:00Z'),
(24, 'group', 'D', 6, 'PAR', 'AUS', 'Levi''s Stadium (Santa Clara)',        '2026-06-26T02:00:00Z');

-- ===== GROUP E =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(25, 'group', 'E', 1, 'GER', 'CUW', 'NRG Stadium (Houston)',                '2026-06-14T17:00:00Z'),
(26, 'group', 'E', 2, 'CIV', 'ECU', 'Lincoln Financial Field (Philadelphia)','2026-06-14T23:00:00Z'),
(27, 'group', 'E', 3, 'GER', 'CIV', 'BMO Field (Toronto)',                  '2026-06-20T20:00:00Z'),
(28, 'group', 'E', 4, 'ECU', 'CUW', 'Arrowhead Stadium (Kansas City)',      '2026-06-21T00:00:00Z'),
(29, 'group', 'E', 5, 'CUW', 'CIV', 'Lincoln Financial Field (Philadelphia)','2026-06-25T20:00:00Z'),
(30, 'group', 'E', 6, 'ECU', 'GER', 'MetLife Stadium (East Rutherford)',    '2026-06-25T20:00:00Z');

-- ===== GROUP F =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(31, 'group', 'F', 1, 'NED', 'JPN', 'AT&T Stadium (Arlington)',             '2026-06-14T20:00:00Z'),
(32, 'group', 'F', 2, 'SWE', 'TUN', 'Estadio BBVA (Monterrey)',             '2026-06-15T02:00:00Z'),
(33, 'group', 'F', 3, 'NED', 'SWE', 'NRG Stadium (Houston)',                '2026-06-20T17:00:00Z'),
(34, 'group', 'F', 4, 'TUN', 'JPN', 'Estadio BBVA (Monterrey)',             '2026-06-20T04:00:00Z'),
(35, 'group', 'F', 5, 'JPN', 'SWE', 'AT&T Stadium (Arlington)',             '2026-06-25T23:00:00Z'),
(36, 'group', 'F', 6, 'TUN', 'NED', 'Arrowhead Stadium (Kansas City)',      '2026-06-25T23:00:00Z');

-- ===== GROUP G =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(37, 'group', 'G', 1, 'BEL', 'EGY', 'Lumen Field (Seattle)',                '2026-06-15T19:00:00Z'),
(38, 'group', 'G', 2, 'IRN', 'NZL', 'SoFi Stadium (Inglewood)',             '2026-06-16T01:00:00Z'),
(39, 'group', 'G', 3, 'BEL', 'IRN', 'SoFi Stadium (Inglewood)',             '2026-06-21T19:00:00Z'),
(40, 'group', 'G', 4, 'NZL', 'EGY', 'BC Place (Vancouver)',                 '2026-06-22T01:00:00Z'),
(41, 'group', 'G', 5, 'EGY', 'IRN', 'Lumen Field (Seattle)',                '2026-06-27T03:00:00Z'),
(42, 'group', 'G', 6, 'NZL', 'BEL', 'BC Place (Vancouver)',                 '2026-06-27T03:00:00Z');

-- ===== GROUP H =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(43, 'group', 'H', 1, 'ESP', 'CPV', 'Mercedes-Benz Stadium (Atlanta)',      '2026-06-15T16:00:00Z'),
(44, 'group', 'H', 2, 'KSA', 'URU', 'Hard Rock Stadium (Miami)',            '2026-06-15T22:00:00Z'),
(45, 'group', 'H', 3, 'ESP', 'KSA', 'Mercedes-Benz Stadium (Atlanta)',      '2026-06-21T16:00:00Z'),
(46, 'group', 'H', 4, 'URU', 'CPV', 'Hard Rock Stadium (Miami)',            '2026-06-21T22:00:00Z'),
(47, 'group', 'H', 5, 'CPV', 'KSA', 'NRG Stadium (Houston)',                '2026-06-27T00:00:00Z'),
(48, 'group', 'H', 6, 'URU', 'ESP', 'Estadio Akron (Guadalajara)',          '2026-06-27T00:00:00Z');

-- ===== GROUP I =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(49, 'group', 'I', 1, 'FRA', 'SEN', 'MetLife Stadium (East Rutherford)',    '2026-06-16T19:00:00Z'),
(50, 'group', 'I', 2, 'IRQ', 'NOR', 'Gillette Stadium (Foxborough)',        '2026-06-16T22:00:00Z'),
(51, 'group', 'I', 3, 'FRA', 'IRQ', 'Lincoln Financial Field (Philadelphia)','2026-06-22T21:00:00Z'),
(52, 'group', 'I', 4, 'NOR', 'SEN', 'MetLife Stadium (East Rutherford)',    '2026-06-23T00:00:00Z'),
(53, 'group', 'I', 5, 'NOR', 'FRA', 'Gillette Stadium (Foxborough)',        '2026-06-26T19:00:00Z'),
(54, 'group', 'I', 6, 'SEN', 'IRQ', 'BMO Field (Toronto)',                  '2026-06-26T19:00:00Z');

-- ===== GROUP J =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(55, 'group', 'J', 1, 'ARG', 'ALG', 'Arrowhead Stadium (Kansas City)',      '2026-06-17T01:00:00Z'),
(56, 'group', 'J', 2, 'AUT', 'JOR', 'Levi''s Stadium (Santa Clara)',        '2026-06-16T04:00:00Z'),
(57, 'group', 'J', 3, 'ARG', 'AUT', 'AT&T Stadium (Arlington)',             '2026-06-22T17:00:00Z'),
(58, 'group', 'J', 4, 'JOR', 'ALG', 'Levi''s Stadium (Santa Clara)',        '2026-06-23T03:00:00Z'),
(59, 'group', 'J', 5, 'JOR', 'ARG', 'AT&T Stadium (Arlington)',             '2026-06-28T02:00:00Z'),
(60, 'group', 'J', 6, 'ALG', 'AUT', 'Arrowhead Stadium (Kansas City)',      '2026-06-28T02:00:00Z');

-- ===== GROUP K =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(61, 'group', 'K', 1, 'POR', 'COD', 'NRG Stadium (Houston)',                '2026-06-17T17:00:00Z'),
(62, 'group', 'K', 2, 'UZB', 'COL', 'Estadio Azteca (Mexico City)',         '2026-06-18T02:00:00Z'),
(63, 'group', 'K', 3, 'POR', 'UZB', 'NRG Stadium (Houston)',                '2026-06-23T17:00:00Z'),
(64, 'group', 'K', 4, 'COL', 'COD', 'Estadio Akron (Guadalajara)',          '2026-06-24T02:00:00Z'),
(65, 'group', 'K', 5, 'COL', 'POR', 'Hard Rock Stadium (Miami)',            '2026-06-27T23:30:00Z'),
(66, 'group', 'K', 6, 'COD', 'UZB', 'Mercedes-Benz Stadium (Atlanta)',      '2026-06-27T23:30:00Z');

-- ===== GROUP L =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a, team_b, venue, kickoff_at) values
(67, 'group', 'L', 1, 'ENG', 'CRO', 'AT&T Stadium (Arlington)',             '2026-06-17T20:00:00Z'),
(68, 'group', 'L', 2, 'GHA', 'PAN', 'BMO Field (Toronto)',                  '2026-06-17T23:00:00Z'),
(69, 'group', 'L', 3, 'ENG', 'GHA', 'Gillette Stadium (Foxborough)',        '2026-06-23T20:00:00Z'),
(70, 'group', 'L', 4, 'PAN', 'CRO', 'BMO Field (Toronto)',                  '2026-06-23T23:00:00Z'),
(71, 'group', 'L', 5, 'PAN', 'ENG', 'MetLife Stadium (East Rutherford)',    '2026-06-27T21:00:00Z'),
(72, 'group', 'L', 6, 'CRO', 'GHA', 'Lincoln Financial Field (Philadelphia)','2026-06-27T21:00:00Z');

-- ===== ROUND OF 32 =====
-- ה-team_a / team_b עוד לא ידועים. האדמין יעדכן אותם אחרי שלב הבתים.
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
( 73, 'r32', null,  1, 'מקום 2 בית A',                          'מקום 2 בית B',                          'SoFi Stadium (Inglewood)',           '2026-06-28T19:00:00Z'),
( 74, 'r32', null,  2, 'מנצחת בית C',                           'מקום 2 בית F',                          'NRG Stadium (Houston)',              '2026-06-29T17:00:00Z'),
( 75, 'r32', null,  3, 'מנצחת בית E',                           'מקום 3 (A/B/C/D/F)',                    'Gillette Stadium (Boston)',          '2026-06-29T20:30:00Z'),
( 76, 'r32', null,  4, 'מנצחת בית F',                           'מקום 2 בית C',                          'Estadio BBVA (Monterrey)',           '2026-06-30T01:00:00Z'),
( 77, 'r32', null,  5, 'מקום 2 בית E',                          'מקום 2 בית I',                          'AT&T Stadium (Dallas)',              '2026-06-30T17:00:00Z'),
( 78, 'r32', null,  6, 'מנצחת בית I',                           'מקום 3 (C/D/F/G/H)',                    'MetLife Stadium (East Rutherford)',  '2026-06-30T21:00:00Z'),
( 79, 'r32', null,  7, 'מנצחת בית A',                           'מקום 3 (C/E/F/H/I)',                    'Estadio Azteca (Mexico City)',       '2026-07-01T01:00:00Z'),
( 80, 'r32', null,  8, 'מנצחת בית L',                           'מקום 3 (E/H/I/J/K)',                    'Mercedes-Benz Stadium (Atlanta)',    '2026-07-01T16:00:00Z'),
( 81, 'r32', null,  9, 'מנצחת בית G',                           'מקום 3 (A/E/H/I/J)',                    'Lumen Field (Seattle)',              '2026-07-01T20:00:00Z'),
( 82, 'r32', null, 10, 'מנצחת בית D',                           'מקום 3 (B/E/F/I/J)',                    'Levi''s Stadium (Santa Clara)',      '2026-07-02T00:00:00Z'),
( 83, 'r32', null, 11, 'מנצחת בית H',                           'מקום 2 בית J',                          'SoFi Stadium (Inglewood)',           '2026-07-02T19:00:00Z'),
( 84, 'r32', null, 12, 'מקום 2 בית K',                          'מקום 2 בית L',                          'BMO Field (Toronto)',                '2026-07-02T23:00:00Z'),
( 85, 'r32', null, 13, 'מנצחת בית B',                           'מקום 3 (E/F/G/I/J)',                    'BC Place (Vancouver)',               '2026-07-03T03:00:00Z'),
( 86, 'r32', null, 14, 'מקום 2 בית D',                          'מקום 2 בית G',                          'AT&T Stadium (Dallas)',              '2026-07-03T18:00:00Z'),
( 87, 'r32', null, 15, 'מנצחת בית J',                           'מקום 2 בית H',                          'Hard Rock Stadium (Miami)',          '2026-07-03T22:00:00Z'),
( 88, 'r32', null, 16, 'מנצחת בית K',                           'מקום 3 (D/E/I/J/L)',                    'Arrowhead Stadium (Kansas City)',    '2026-07-04T01:30:00Z');

-- ===== ROUND OF 16 =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
( 89, 'r16', null, 1, 'מנצחת מ-R32 משחק 1',  'מנצחת מ-R32 משחק 2',  'NRG Stadium (Houston)',              '2026-07-04T17:00:00Z'),
( 90, 'r16', null, 2, 'מנצחת מ-R32 משחק 3',  'מנצחת מ-R32 משחק 4',  'Lincoln Financial Field (Philadelphia)','2026-07-04T21:00:00Z'),
( 91, 'r16', null, 3, 'מנצחת מ-R32 משחק 5',  'מנצחת מ-R32 משחק 6',  'MetLife Stadium (New Jersey)',       '2026-07-05T20:00:00Z'),
( 92, 'r16', null, 4, 'מנצחת מ-R32 משחק 7',  'מנצחת מ-R32 משחק 8',  'Estadio Azteca (Mexico City)',       '2026-07-06T00:00:00Z'),
( 93, 'r16', null, 5, 'מנצחת מ-R32 משחק 9',  'מנצחת מ-R32 משחק 10', 'AT&T Stadium (Dallas)',              '2026-07-06T19:00:00Z'),
( 94, 'r16', null, 6, 'מנצחת מ-R32 משחק 11', 'מנצחת מ-R32 משחק 12', 'Lumen Field (Seattle)',              '2026-07-07T00:00:00Z'),
( 95, 'r16', null, 7, 'מנצחת מ-R32 משחק 13', 'מנצחת מ-R32 משחק 14', 'Mercedes-Benz Stadium (Atlanta)',    '2026-07-07T16:00:00Z'),
( 96, 'r16', null, 8, 'מנצחת מ-R32 משחק 15', 'מנצחת מ-R32 משחק 16', 'BC Place (Vancouver)',               '2026-07-07T20:00:00Z');

-- ===== QUARTERFINALS =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
( 97, 'qf', null, 1, 'מנצחת R16 משחק 1', 'מנצחת R16 משחק 2', 'Gillette Stadium (Boston)',        '2026-07-09T20:00:00Z'),
( 98, 'qf', null, 2, 'מנצחת R16 משחק 3', 'מנצחת R16 משחק 4', 'SoFi Stadium (Inglewood)',         '2026-07-10T19:00:00Z'),
( 99, 'qf', null, 3, 'מנצחת R16 משחק 5', 'מנצחת R16 משחק 6', 'Hard Rock Stadium (Miami)',        '2026-07-11T21:00:00Z'),
(100, 'qf', null, 4, 'מנצחת R16 משחק 7', 'מנצחת R16 משחק 8', 'Arrowhead Stadium (Kansas City)',  '2026-07-12T01:00:00Z');

-- ===== SEMIFINALS =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
(101, 'sf', null, 1, 'מנצחת QF 1', 'מנצחת QF 2', 'AT&T Stadium (Dallas)',           '2026-07-14T19:00:00Z'),
(102, 'sf', null, 2, 'מנצחת QF 3', 'מנצחת QF 4', 'Mercedes-Benz Stadium (Atlanta)', '2026-07-15T19:00:00Z');

-- ===== THIRD PLACE =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
(103, 'third', null, 1, 'מפסידת חצי 1', 'מפסידת חצי 2', 'Hard Rock Stadium (Miami)', '2026-07-18T21:00:00Z');

-- ===== FINAL =====
insert into public.matches (id, stage, group_letter, match_number_in_stage, team_a_placeholder, team_b_placeholder, venue, kickoff_at) values
(104, 'final', null, 1, 'מנצחת חצי 1', 'מנצחת חצי 2', 'MetLife Stadium (New Jersey)', '2026-07-19T19:00:00Z');

-- ==========================================================================
-- ולידציה
-- ==========================================================================
-- אמור להחזיר 72 group, 16 r32, 8 r16, 4 qf, 2 sf, 1 third, 1 final
-- select stage, count(*) from public.matches group by stage order by stage;
