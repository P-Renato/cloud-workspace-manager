--
-- PostgreSQL database dump
--

\restrict Fq7rlhriKlmQajbF4A3nIboKoHL5AtUCUFKxxbe7eilk5hX9Jk5QU6KyiLUFN4Z

-- Dumped from database version 17.10 (Debian 17.10-1.pgdg13+1)
-- Dumped by pg_dump version 17.10 (Debian 17.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: activity_logs; Type: TABLE; Schema: public; Owner: cloudworkspace_app
--

CREATE TABLE public.activity_logs (
    id uuid NOT NULL,
    workspace_id uuid NOT NULL,
    action character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activity_logs OWNER TO cloudworkspace_app;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: cloudworkspace_app
--

CREATE TABLE public.schema_migrations (
    version character varying(255) NOT NULL,
    applied_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.schema_migrations OWNER TO cloudworkspace_app;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cloudworkspace_app
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO cloudworkspace_app;

--
-- Name: workspaces; Type: TABLE; Schema: public; Owner: cloudworkspace_app
--

CREATE TABLE public.workspaces (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    status character varying(20) DEFAULT 'stopped'::character varying NOT NULL,
    container_id character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    template_id character varying(50) NOT NULL,
    image character varying(100) NOT NULL,
    CONSTRAINT workspaces_status_check CHECK (((status)::text = ANY ((ARRAY['stopped'::character varying, 'running'::character varying, 'error'::character varying])::text[])))
);


ALTER TABLE public.workspaces OWNER TO cloudworkspace_app;

--
-- Data for Name: activity_logs; Type: TABLE DATA; Schema: public; Owner: cloudworkspace_app
--

COPY public.activity_logs (id, workspace_id, action, created_at) FROM stdin;
7f1261e4-6621-49e1-8df6-e12206f15eb9	d0b5c9c9-9f36-458f-87de-66a95631f201	CREATE_WORKSPACE	2026-07-24 11:55:06.224316
61d56d32-59a2-43f8-a56b-000fb3c09a6c	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-07-24 11:55:12.633324
1121077a-e40e-4c1d-8a3a-702678568725	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:22:15.719725
571747bd-f258-49ab-9172-1e431afdfe2e	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:22:15.722843
9636bb69-e75c-4f54-97cc-7981e4ee5b71	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:22:15.756467
c47f53ca-b655-4caf-b0a6-51a02e7b865f	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-07-24 12:22:18.374341
30daed65-43d5-4cfe-8bfc-96b4e60212f2	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:23:04.25614
c8e66703-b957-4f73-a97a-82411ad9fd68	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:23:04.257666
410a2571-6fc6-4891-8eee-abf49162a221	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-07-24 12:23:04.261928
a9714ac6-847d-4f29-8c19-0028cb477df5	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-07-24 12:23:08.736084
81cd88c5-117d-4020-8cab-a5ea5e069012	24d78c53-3897-4e68-ba57-540559a97e3f	CREATE_WORKSPACE	2026-07-24 12:29:50.981299
e90a1237-d999-4eb7-b75f-ad5ad8ea5d4a	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-07-26 11:54:08.250147
895211c9-f811-401f-97c3-d0cec0a1f07c	c853a4a2-77b1-4159-be3b-2cfc709e5c21	CREATE_WORKSPACE	2026-07-30 11:03:13.361946
1ed42313-72de-4995-86cd-6beb49ffc105	c853a4a2-77b1-4159-be3b-2cfc709e5c21	START_WORKSPACE	2026-07-31 08:00:15.234133
191cdc3c-b06c-43f9-84ce-5e20b304f05a	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-08-01 03:06:51.024783
b4629dad-7e79-4bc0-a35a-7cb58918a642	bde39a41-32f9-4535-a5e4-c65731e6fa7e	CREATE_WORKSPACE	2026-08-01 20:46:29.864276
f2e66bc7-945b-4ee0-bf24-1f68e4a9abf2	bde39a41-32f9-4535-a5e4-c65731e6fa7e	START_WORKSPACE	2026-08-01 20:47:37.433285
6ee25cf4-573b-4687-ae50-1855235223a8	ad636cb3-47cb-4bf9-88a1-879a600a1278	CREATE_WORKSPACE	2026-08-02 19:29:54.091228
acfdca7c-ae74-4a09-9291-f68d2f91d48b	ad636cb3-47cb-4bf9-88a1-879a600a1278	START_WORKSPACE	2026-08-02 19:29:56.074794
622bbad6-0f60-4eb9-b233-e245976a79e3	ef5af237-beaa-481e-a5c0-510ce9c1bd5b	CREATE_WORKSPACE	2026-08-02 19:30:41.365401
f9868408-6bc4-4da1-99c7-41505b9d7a26	a43bd292-b5d1-4823-8d0f-068ac4d1e146	CREATE_WORKSPACE	2026-08-02 19:45:49.956524
424150c6-816f-4180-b833-c201bb88aee2	a43bd292-b5d1-4823-8d0f-068ac4d1e146	START_WORKSPACE	2026-08-02 19:45:54.26222
6dc1644a-9771-45eb-8e1f-433396fc1adf	3531b351-25f0-47e9-b755-b08f27fa5ec3	CREATE_WORKSPACE	2026-08-02 19:46:39.124677
0fea6051-44c1-41e8-9d27-884ababc8e43	3531b351-25f0-47e9-b755-b08f27fa5ec3	START_WORKSPACE	2026-08-02 19:46:42.395467
fbbaed90-9e66-43a1-98e7-f7e0b42309c2	e82ad181-7a56-47ec-9352-6e6f77095afb	CREATE_WORKSPACE	2026-08-02 19:47:17.128741
1132d6a5-cf2c-495d-90a4-0ce9444ab725	60c686ce-b533-47cb-b002-7f7d9fdb5465	CREATE_WORKSPACE	2026-08-02 20:28:00.439117
74821c2a-a330-4a33-a793-bf95e49755be	60c686ce-b533-47cb-b002-7f7d9fdb5465	START_WORKSPACE	2026-08-02 20:28:06.459252
aa048906-a6c2-4ba6-b9ad-3f4659e4e2a5	e82ad181-7a56-47ec-9352-6e6f77095afb	START_WORKSPACE	2026-08-02 20:29:05.992428
bd4f17c8-5484-4082-8d9d-7acd85cc7f69	497d88d5-1707-457e-93af-c45ce5ebb626	CREATE_WORKSPACE	2026-08-02 21:17:25.966697
0825e271-7b6e-4282-8ac8-ce392f3f06af	497d88d5-1707-457e-93af-c45ce5ebb626	START_WORKSPACE	2026-08-02 21:49:19.637014
6623c9ac-f42c-45ec-aa54-6a004e0989c9	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	CREATE_WORKSPACE	2026-08-04 07:26:47.31895
a8517b48-dd18-4e24-bbd2-ef5fcb74ec85	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	START_WORKSPACE	2026-08-04 07:26:49.596007
7a400c98-6636-4e4d-bf4c-99e98262b5e9	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	STOP_WORKSPACE	2026-08-04 07:29:22.935304
19d1fcb5-9735-41c8-9806-57fa23a53f88	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	STOP_WORKSPACE	2026-08-04 07:29:22.947185
2d26de96-9403-4976-a468-aba82c1602a5	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	START_WORKSPACE	2026-08-04 07:29:25.28826
8fbc8fdb-16c9-4644-b05d-f8307948f1e1	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	START_WORKSPACE	2026-08-04 09:10:47.541644
3e0a1812-19c9-4ea8-9d1e-efcbc514630f	836ce1ad-e202-42c9-ae0d-2ec9eaaba590	STOP_WORKSPACE	2026-08-04 11:42:16.188383
195bb5e6-cf1d-4fdb-9579-7f13780e26f2	c853a4a2-77b1-4159-be3b-2cfc709e5c21	STOP_WORKSPACE	2026-08-04 11:42:34.332538
cbc2055b-b9f4-4654-ac80-5bc00c114eb3	d0b5c9c9-9f36-458f-87de-66a95631f201	STOP_WORKSPACE	2026-08-04 11:43:35.168866
2297f13b-e80a-4166-8880-8f6a8eb9b34b	d0b5c9c9-9f36-458f-87de-66a95631f201	START_WORKSPACE	2026-08-04 12:19:06.78197
0b58ff97-067e-4168-ba3a-f047c24305c0	355abc1d-e2b5-4442-9b6b-91fa461bdae5	CREATE_WORKSPACE	2026-08-04 12:20:02.705473
bfe37992-13c0-4991-aedd-f0d6c7aac897	355abc1d-e2b5-4442-9b6b-91fa461bdae5	START_WORKSPACE	2026-08-04 12:20:06.455135
71eb181a-8733-42e5-a934-dda0a4636a0a	512e1ed1-1420-420b-a6ed-45284850df6d	CREATE_WORKSPACE	2026-08-04 13:14:11.465661
9a7139bc-384a-4c35-a251-5c1341deaa53	512e1ed1-1420-420b-a6ed-45284850df6d	START_WORKSPACE	2026-08-04 13:14:19.438554
9df40177-3b17-462c-b7e2-244b4b4c868c	512e1ed1-1420-420b-a6ed-45284850df6d	STOP_WORKSPACE	2026-08-04 13:15:15.219792
df9252b2-6237-4929-a1f4-a996bdf14a89	512e1ed1-1420-420b-a6ed-45284850df6d	START_WORKSPACE	2026-08-04 13:15:22.019711
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: cloudworkspace_app
--

COPY public.schema_migrations (version, applied_at) FROM stdin;
001_create_users.sql	2026-07-24 09:42:16.209274
002_create_workspaces.sql	2026-07-24 09:42:16.217801
003_create_activity_logs.sql	2026-07-24 09:42:16.228516
004_add_workspace_templates.sql	2026-07-24 09:42:16.233841
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: cloudworkspace_app
--

COPY public.users (id, email, password_hash, created_at) FROM stdin;
71ccd08d-0af3-42ab-a4be-d54ddddccb08	test@example.com	$2b$10$5.tICUHG9ED6wisNd.Vz6uDSC1D8g3cMKSRSgICnek9q7LYlBsV7C	2026-07-24 09:51:03.282251
d2f3942a-c573-448e-8c8b-6f803822f3c4	front-test1@test.com	$2b$10$5W7jK1Wbd0m5NGfalqkC0uGxBJQJ7vBLjoDFWuE8aml7God.N2on.	2026-07-24 10:49:50.190262
50f6703c-c395-4ca3-8bb1-1e73e1107dd6	test123@example.com	$2b$10$vQD9sof5nVvWqEDZt.uPNu52MCTvW6eSlCK1fDVWIUgIl0hwIx3Ey	2026-07-24 22:50:46.215688
fc1b7a9b-1f3c-4645-b013-4d7d2a1469fc	front-test3@test.com	$2b$10$X3fh2daHZXa33Q8oF7HSAePJzmhFPx4lA64kToNucrOnFKr1ZsHre	2026-07-26 17:31:42.360385
05d66770-95fd-435e-a2bf-1420373855da	curl-test1@test.com	$2b$10$c7PVD6wUeP9Q6eMVxgtLKeJ5yNH/KvUrLlAhYTs5sJUmbKqfGkmty	2026-07-26 17:32:47.27216
f553089b-a560-4971-b06f-57aa965c5ecf	template@exa.com	$2b$10$/xrX.RgnOuymSm9XSySX/umC5Ny37dl.N/cztjA6PAJHdVxEpLOym	2026-08-01 20:43:50.753611
d94a6332-af69-4e50-b5e1-99b9bec7ef01	front-test2@test.com	$2b$10$ATXaPeyfdgif554t0sUC2unZgpj/wVfqTQynxK95GeTuwvWWH9NVS	2026-08-02 19:29:14.897382
1f066d44-dd50-4eeb-aa25-a42177111c30	front-test4@test.com	$2b$10$afXI7I/0oufH4DalSndiUO.dZuqPLYYblMYsomQ6aadahAuj7x5Rq	2026-08-04 13:13:38.008828
\.


--
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: cloudworkspace_app
--

COPY public.workspaces (id, user_id, name, status, container_id, created_at, updated_at, template_id, image) FROM stdin;
d0b5c9c9-9f36-458f-87de-66a95631f201	d2f3942a-c573-448e-8c8b-6f803822f3c4	Front-work-test1	running	affe951c258dcd587a351bf96409abb04d61a9bf50dc55ae402bee6eb9a27395	2026-07-24 11:55:06.216721	2026-08-04 12:20:06.759793	ubuntu	ubuntu:24.04
512e1ed1-1420-420b-a6ed-45284850df6d	1f066d44-dd50-4eeb-aa25-a42177111c30	work-front-test1	running	be1119e4669db7fe1f85bb2bddd3ac3c6894b8d51568650af34a00ebe9ad5e7d	2026-08-04 13:14:11.458229	2026-08-04 13:56:30.034341	ubuntu	ubuntu:24.04
355abc1d-e2b5-4442-9b6b-91fa461bdae5	d2f3942a-c573-448e-8c8b-6f803822f3c4	Front-work-test3	running	851fad85e3dff27603918e7ae030a6678bdda173b13f5ac7821482a40d38daea	2026-08-04 12:20:02.702013	2026-08-04 12:21:18.788933	ubuntu	ubuntu:24.04
497d88d5-1707-457e-93af-c45ce5ebb626	d94a6332-af69-4e50-b5e1-99b9bec7ef01	front2-work-test6	running	1ad6ad3d9eaa0311efb668c2cffbc5065980b3e2b03352bae976d6889c45f3f7	2026-08-02 21:17:25.958973	2026-08-02 21:49:21.221015	ubuntu	ubuntu:24.04
bde39a41-32f9-4535-a5e4-c65731e6fa7e	f553089b-a560-4971-b06f-57aa965c5ecf	My First template	running	66a791861305b530aded259d5a71ca3d5d82f98c52b412294ef96a758f4031d1	2026-08-01 20:46:29.856922	2026-08-01 20:47:41.752897	alpine	alpine:latest
24d78c53-3897-4e68-ba57-540559a97e3f	71ccd08d-0af3-42ab-a4be-d54ddddccb08	My First Workspace	stopped	\N	2026-07-24 12:29:50.951364	2026-07-24 13:11:39.990107	alpine	alpine:latest
60c686ce-b533-47cb-b002-7f7d9fdb5465	d94a6332-af69-4e50-b5e1-99b9bec7ef01	front2-test-python-test2	running	50ed335ba95883dbf19e4adf3ecbdf35626e204d87af19e0ab8cca1cbd54421b	2026-08-02 20:28:00.409276	2026-08-02 21:49:19.65506	python312	python:3.12-alpine
e82ad181-7a56-47ec-9352-6e6f77095afb	d94a6332-af69-4e50-b5e1-99b9bec7ef01	Front2-work-python-test	running	106d96e8ac8b4615d15b2ffe29435f5adc81689e1e0e1d053c99a85492a08fc8	2026-08-02 19:47:17.121122	2026-08-02 21:49:19.659837	python312	python:3.12-alpine
3531b351-25f0-47e9-b755-b08f27fa5ec3	d94a6332-af69-4e50-b5e1-99b9bec7ef01	Front2-work_alpine-test	running	a06965a6cb77cee99c03403f5268223218999ace8f44562b09b8cb0699c2aeb4	2026-08-02 19:46:39.116595	2026-08-02 21:49:19.664331	alpine	alpine:latest
a43bd292-b5d1-4823-8d0f-068ac4d1e146	d94a6332-af69-4e50-b5e1-99b9bec7ef01	front2-work_node-test	running	8e76cec344254279940e9003f4ac7db4ce49a9306fc267f3c68971a028d82fe2	2026-08-02 19:45:49.947475	2026-08-02 21:49:19.668425	node22	node:22-alpine
ef5af237-beaa-481e-a5c0-510ce9c1bd5b	d94a6332-af69-4e50-b5e1-99b9bec7ef01	front2-work-test2	stopped	\N	2026-08-02 19:30:41.358076	2026-08-02 21:49:19.671991	python312	python:3.12-alpine
ad636cb3-47cb-4bf9-88a1-879a600a1278	d94a6332-af69-4e50-b5e1-99b9bec7ef01	front2-work-test1	running	2aff5ee836f71e63201ade04a05492b2ad9d6b015c040ba6c121643587a4ae73	2026-08-02 19:29:54.088204	2026-08-02 21:49:19.677978	ubuntu	ubuntu:24.04
836ce1ad-e202-42c9-ae0d-2ec9eaaba590	d2f3942a-c573-448e-8c8b-6f803822f3c4	Front-work-test2	stopped	883a84e02ac073d9ab038341808144495cf5897da591c468b3c9f69976c1df97	2026-08-04 07:26:47.312591	2026-08-04 12:20:06.752237	ubuntu	ubuntu:24.04
c853a4a2-77b1-4159-be3b-2cfc709e5c21	d2f3942a-c573-448e-8c8b-6f803822f3c4	third-work-test	stopped	3faddc1c618fc856ef62d9d85f52b2cf1e29ccebf79e59dc9795f0bf0c02f6eb	2026-07-30 11:03:13.353556	2026-08-04 12:20:06.756416	alpine	alpine:latest
\.


--
-- Name: activity_logs activity_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT activity_logs_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: workspaces workspaces_pkey; Type: CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT workspaces_pkey PRIMARY KEY (id);


--
-- Name: activity_logs fk_workspace; Type: FK CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.activity_logs
    ADD CONSTRAINT fk_workspace FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id) ON DELETE CASCADE;


--
-- Name: workspaces fk_workspaces_user; Type: FK CONSTRAINT; Schema: public; Owner: cloudworkspace_app
--

ALTER TABLE ONLY public.workspaces
    ADD CONSTRAINT fk_workspaces_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Fq7rlhriKlmQajbF4A3nIboKoHL5AtUCUFKxxbe7eilk5hX9Jk5QU6KyiLUFN4Z

