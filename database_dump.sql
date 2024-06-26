--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applications (
    id integer NOT NULL,
    student_id integer,
    program_id integer,
    college_id integer,
    application_date date NOT NULL
);


ALTER TABLE public.applications OWNER TO postgres;

--
-- Name: applications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.applications_id_seq OWNER TO postgres;

--
-- Name: applications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;


--
-- Name: college; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.college (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    programs text[] NOT NULL,
    gpa_requirement numeric(3,2),
    application_fee numeric,
    program_duration integer,
    entry_requirements text,
    program_id integer,
    standardized_test_required boolean,
    program_temp character varying(100),
    location character varying(255),
    accreditation character varying(255),
    average_tuition numeric(10,2),
    student_body_size integer,
    acceptance_rate numeric(5,2),
    graduation_rate numeric(5,2),
    housing_available boolean,
    scholarship_info text,
    international_support boolean,
    career_services boolean,
    alumni_network_strength text,
    faculty_student_ratio numeric(10,2),
    research_opportunities boolean,
    online_education_options text
);


ALTER TABLE public.college OWNER TO postgres;

--
-- Name: college_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.college_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.college_id_seq OWNER TO postgres;

--
-- Name: college_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.college_id_seq OWNED BY public.college.id;


--
-- Name: college_programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.college_programs (
    college_id integer NOT NULL,
    program_id integer NOT NULL
);


ALTER TABLE public.college_programs OWNER TO postgres;

--
-- Name: colleges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.colleges (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.colleges OWNER TO postgres;

--
-- Name: colleges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.colleges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.colleges_id_seq OWNER TO postgres;

--
-- Name: colleges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.colleges_id_seq OWNED BY public.colleges.id;


--
-- Name: offerings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offerings (
    college_id integer NOT NULL,
    program_id integer NOT NULL
);


ALTER TABLE public.offerings OWNER TO postgres;

--
-- Name: program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.program (
    program_id integer NOT NULL,
    program_name character varying(100) NOT NULL
);


ALTER TABLE public.program OWNER TO postgres;

--
-- Name: program_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.program_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.program_program_id_seq OWNER TO postgres;

--
-- Name: program_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.program_program_id_seq OWNED BY public.program.program_id;


--
-- Name: programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programs (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.programs OWNER TO postgres;

--
-- Name: programs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.programs_id_seq OWNER TO postgres;

--
-- Name: programs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    program character varying(255) NOT NULL
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: student_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_id_seq OWNER TO postgres;

--
-- Name: student_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_id_seq OWNED BY public.student.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100),
    program character varying(100)
);


ALTER TABLE public.students OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.students_id_seq OWNER TO postgres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: applications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);


--
-- Name: college id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college ALTER COLUMN id SET DEFAULT nextval('public.college_id_seq'::regclass);


--
-- Name: colleges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colleges ALTER COLUMN id SET DEFAULT nextval('public.colleges_id_seq'::regclass);


--
-- Name: program program_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program ALTER COLUMN program_id SET DEFAULT nextval('public.program_program_id_seq'::regclass);


--
-- Name: programs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);


--
-- Name: student id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student ALTER COLUMN id SET DEFAULT nextval('public.student_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applications (id, student_id, program_id, college_id, application_date) FROM stdin;
\.


--
-- Data for Name: college; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.college (id, name, programs, gpa_requirement, application_fee, program_duration, entry_requirements, program_id, standardized_test_required, program_temp, location, accreditation, average_tuition, student_body_size, acceptance_rate, graduation_rate, housing_available, scholarship_info, international_support, career_services, alumni_network_strength, faculty_student_ratio, research_opportunities, online_education_options) FROM stdin;
17	University of Example	{"Computer Science","Business Administration"}	3.50	100	4	High school diploma or equivalent, plus personal statement	1	t	STEM	Example City, USA	Accredited by the National Academic Accreditation Council	20000.00	15000	35.00	70.00	t	Available scholarships include merit-based and need-based awards.	t	t	Strong, featuring regular meetups and professional development opportunities	15.00	t	Hybrid and fully online programs available
3	New University	{"Computer Science",Architecture}	3.20	50	4	High school diploma required	\N	\N	\N	New York, NY, USA	Regional - Middle States Commission on Higher Education	30000.00	15000	85.00	85.00	t	Merit-based and need-based scholarships available	t	t	Strong - over 100,000 active alumni worldwide	15.50	t	Limited online programs available
1	Tech University	{"Computer Science",Engineering}	3.80	50	4	High school diploma required	\N	\N	\N	California, USA	Regional - Middle States Commission on Higher Education	190000.00	15000	35.00	85.00	t	Merit-based and need-based scholarships available	t	t	Strong - over 100,000 active alumni worldwide	15.50	f	Limited online programs available
2	Business School	{"Business Administration",Marketing}	3.70	50	4	High school diploma required	\N	\N	\N	New Mexico, USA	Regional - Middle States Commission on Higher Education	10000.00	5000	35.00	85.00	t	Merit-based and need-based scholarships available	f	t	Strong - over 100,000 active alumni worldwide	25.50	f	Limited online programs available
4	Marketing School	{"Business Administration",Marketing}	3.40	50	4	High school diploma required	\N	\N	\N	California, USA	Regional - Middle States Commission on Higher Education	90000.00	15000	35.00	85.00	t	Merit-based and need-based scholarships available	t	t	Strong - over 100,000 active alumni worldwide	15.50	f	Limited online programs available
7	University X	{Business,Marketing}	3.65	55	4	High school diploma, transcripts	4	t	\N	Arizona, USA	Regional - Middle States Commission on Higher Education	100000.00	15000	35.00	85.00	t	Merit-based and need-based scholarships available	t	t	Strong - over 100,000 active alumni worldwide	15.50	t	Limited online programs available
8	College Y	{"Computer Science",Geography}	3.30	40	4	High school diploma	2	f	\N	New Hampshire, USA	Regional - Middle States Commission on Higher Education	200000.00	15000	35.00	85.00	t	Merit-based and need-based scholarships available	f	t	Strong - over 100,000 active alumni worldwide	45.50	t	Limited online programs available
9	University of Idaho	{"Computer Science"," Agriculture",Entemology,Business,Marketing}	3.65	55	4	High school diploma, transcripts	4	t	\N	Idaho, USA	Regional - Middle States Commission on Higher Education	100000.00	15000	85.00	85.00	t	Merit-based and need-based scholarships available	t	t	Strong - over 100,000 active alumni worldwide	15.50	t	Limited online programs available
10	College Idaho	{"Computer Science",Art,Music,Geography}	3.30	40	3	High school diploma	2	f	\N	Idaho, USA	Regional - Northwest Commission on Colleges and Universities	80000.00	8000	50.00	70.00	t	Multiple scholarship opportunities for both in-state and out-of-state students	t	t	Extensive network with notable success in the technology sector	18.00	t	A wide range of online undergraduate and graduate programs
11	Innovative Tech College	{"Information Technology","Software Development"}	3.50	60	4	High school diploma, SAT scores, Coding bootcamp certificate	5	t	\N	Texas, USA	National - Accrediting Commission of Career Schools and Colleges	15000.00	4000	45.00	75.00	t	Scholarships for outstanding academic performance, women in tech, and underrepresented minorities	t	t	Expanding network with growing opportunities in startups	22.00	t	Extensive online course offerings including MOOCs
12	Global Arts Institute	{"Fine Arts","Graphic Design","Art History"}	3.20	70	4	High school diploma, Portfolio review, Recommendation letters	6	f	\N	Paris, France	International - European Association for Quality Assurance in Higher Education	20000.00	3000	60.00	80.00	t	Talent-based scholarships for artists, exhibitions sponsorships	t	t	Renowned alumni with successful careers in various art sectors	10.00	t	Remote learning programs for art history and theory
\.


--
-- Data for Name: college_programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.college_programs (college_id, program_id) FROM stdin;
\.






--
-- Data for Name: program; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.program (program_id, program_name) FROM stdin;
1	Arts Program
2	Computer Science
3	Architecture
4	Business
5	Marketing
6	Geography
7	Music
\.


--
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.programs (id, name) FROM stdin;
1	Computer Science
2	Electrical Engineering
3	Physics
4	Computer Science
\.





--
-- Name: applications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.applications_id_seq', 1, false);


--
-- Name: college_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.college_id_seq', 17, true);


--
-- Name: colleges_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.colleges_id_seq', 3, true);


--
-- Name: program_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.program_program_id_seq', 7, true);


--
-- Name: programs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.programs_id_seq', 4, true);


--
-- Name: student_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_id_seq', 2, true);


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.students_id_seq', 177, true);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);


--
-- Name: college college_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college
    ADD CONSTRAINT college_pkey PRIMARY KEY (id);


--
-- Name: college_programs college_programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college_programs
    ADD CONSTRAINT college_programs_pkey PRIMARY KEY (college_id, program_id);


--
-- Name: colleges colleges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.colleges
    ADD CONSTRAINT colleges_pkey PRIMARY KEY (id);


--
-- Name: offerings offerings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerings
    ADD CONSTRAINT offerings_pkey PRIMARY KEY (college_id, program_id);


--
-- Name: program program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (program_id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: applications applications_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id);


--
-- Name: applications applications_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(id);


--
-- Name: applications applications_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: college_programs college_programs_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college_programs
    ADD CONSTRAINT college_programs_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id);


--
-- Name: college_programs college_programs_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college_programs
    ADD CONSTRAINT college_programs_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(id);


--
-- Name: college fk_college_program; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.college
    ADD CONSTRAINT fk_college_program FOREIGN KEY (program_id) REFERENCES public.program(program_id);


--
-- Name: offerings offerings_college_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerings
    ADD CONSTRAINT offerings_college_id_fkey FOREIGN KEY (college_id) REFERENCES public.colleges(id);


--
-- Name: offerings offerings_program_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offerings
    ADD CONSTRAINT offerings_program_id_fkey FOREIGN KEY (program_id) REFERENCES public.programs(id);


--
-- PostgreSQL database dump complete
--

