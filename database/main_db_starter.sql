PGDMP     (    1                x           FinkiESystem    12.2    12.2     )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    24636    FinkiESystem    DATABASE     �   CREATE DATABASE "FinkiESystem" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "FinkiESystem";
                postgres    false            �            1259    49470    exam    TABLE     S  CREATE TABLE public.exam (
    student integer NOT NULL,
    subject character varying(10) NOT NULL,
    professor integer NOT NULL,
    session integer NOT NULL,
    grade integer NOT NULL,
    type character varying(50) NOT NULL,
    yearofattendance character(9) NOT NULL,
    semester integer NOT NULL,
    dateofexam date NOT NULL
);
    DROP TABLE public.exam;
       public         heap    postgres    false            �            1259    49473 	   professor    TABLE     �   CREATE TABLE public.professor (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL
);
    DROP TABLE public.professor;
       public         heap    postgres    false            �            1259    49476    program    TABLE     c   CREATE TABLE public.program (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);
    DROP TABLE public.program;
       public         heap    postgres    false            �            1259    49479    session    TABLE     �   CREATE TABLE public.session (
    id integer NOT NULL,
    month character varying(20) NOT NULL,
    year integer NOT NULL,
    active integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    49483    student    TABLE     !  CREATE TABLE public.student (
    index integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    totalexams integer NOT NULL,
    address character varying(100) NOT NULL,
    embg character(13) NOT NULL,
    mobilenumber character varying(15),
    mail character varying(50) NOT NULL,
    program integer,
    sex character(1) NOT NULL,
    dateofbirth date NOT NULL,
    yearofstartstudies integer NOT NULL,
    type character varying(50) NOT NULL,
    status character varying(50) NOT NULL
);
    DROP TABLE public.student;
       public         heap    postgres    false            �            1259    49486    subject    TABLE     �   CREATE TABLE public.subject (
    code character varying(10) NOT NULL,
    name character varying(50) NOT NULL,
    credits integer NOT NULL
);
    DROP TABLE public.subject;
       public         heap    postgres    false            !          0    49470    exam 
   TABLE DATA           y   COPY public.exam (student, subject, professor, session, grade, type, yearofattendance, semester, dateofexam) FROM stdin;
    public          postgres    false    202   8        "          0    49473 	   professor 
   TABLE DATA           6   COPY public.professor (id, name, surname) FROM stdin;
    public          postgres    false    203   Q!       #          0    49476    program 
   TABLE DATA           +   COPY public.program (id, name) FROM stdin;
    public          postgres    false    204   H$       $          0    49479    session 
   TABLE DATA           :   COPY public.session (id, month, year, active) FROM stdin;
    public          postgres    false    205   %%       %          0    49483    student 
   TABLE DATA           �   COPY public.student (index, name, surname, totalexams, address, embg, mobilenumber, mail, program, sex, dateofbirth, yearofstartstudies, type, status) FROM stdin;
    public          postgres    false    206   �%       &          0    49486    subject 
   TABLE DATA           6   COPY public.subject (code, name, credits) FROM stdin;
    public          postgres    false    207   �'       �
           2606    49490    exam exam_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.exam
    ADD CONSTRAINT exam_pkey PRIMARY KEY (student, subject);
 8   ALTER TABLE ONLY public.exam DROP CONSTRAINT exam_pkey;
       public            postgres    false    202    202            �
           2606    49492    professor professor_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.professor DROP CONSTRAINT professor_pkey;
       public            postgres    false    203            �
           2606    49494    program program_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.program
    ADD CONSTRAINT program_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.program DROP CONSTRAINT program_pkey;
       public            postgres    false    204            �
           2606    49496    session session_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    205            �
           2606    49498    student student_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (index);
 >   ALTER TABLE ONLY public.student DROP CONSTRAINT student_pkey;
       public            postgres    false    206            �
           2606    49500    subject subject_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.subject
    ADD CONSTRAINT subject_pkey PRIMARY KEY (code);
 >   ALTER TABLE ONLY public.subject DROP CONSTRAINT subject_pkey;
       public            postgres    false    207            �
           2606    49501    exam exam_professor_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.exam
    ADD CONSTRAINT exam_professor_fkey FOREIGN KEY (professor) REFERENCES public.professor(id);
 B   ALTER TABLE ONLY public.exam DROP CONSTRAINT exam_professor_fkey;
       public          postgres    false    202    2709    203            �
           2606    49506    exam exam_session_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.exam
    ADD CONSTRAINT exam_session_fkey FOREIGN KEY (session) REFERENCES public.session(id);
 @   ALTER TABLE ONLY public.exam DROP CONSTRAINT exam_session_fkey;
       public          postgres    false    202    205    2713            �
           2606    49511    exam exam_student_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.exam
    ADD CONSTRAINT exam_student_fkey FOREIGN KEY (student) REFERENCES public.student(index);
 @   ALTER TABLE ONLY public.exam DROP CONSTRAINT exam_student_fkey;
       public          postgres    false    2715    206    202            �
           2606    49516    exam exam_subject_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.exam
    ADD CONSTRAINT exam_subject_fkey FOREIGN KEY (subject) REFERENCES public.subject(code);
 @   ALTER TABLE ONLY public.exam DROP CONSTRAINT exam_subject_fkey;
       public          postgres    false    2717    207    202            �
           2606    49521    student student_program_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_program_fkey FOREIGN KEY (program) REFERENCES public.program(id);
 F   ALTER TABLE ONLY public.student DROP CONSTRAINT student_program_fkey;
       public          postgres    false    204    206    2711            !   	  x���Kn�0D��]�pHɲ�EO�E6=L�K��h����9s�ʎ��'�V�<q�Ds���v�((	�z�'��;��;�3�v�����VI���d��l�v������P���$��'YO����u$Rf�45�R��H�fϝGnH����x�]%���-IGwzMN:�R�H��+	��(���*�8��T�.�\a/��ӆ4�r�����8�t8�L�Rߓ���n���[�Zd���5oY������Hrw��7��>D      "   �  x�uU[RA��9'H��.9�'��8��1U��.��l�x���F�f�K�x$��VKN�J���&��T��RZyp�=�~)�Y���KK��
�s�'��.��RɃ�-�+����e4=~ �ܬ~���$r��X��_�:L�J��?"Ǔ4�L�9P��h�ڝ%ra�ku�#��\�i�'f��F�|~h���~���j���x�. ��Բ�՚9Wh�%�̜&�/�����	��n���(,����� u�V��y�
�2��ci"
x��5������`5��fW��딴�a��O�ɉUasMA��0�Bܛa��U� �]�m%t>�+`�+!$��=;�J,�ǳiUg�U=��-�0�����֯�@�q�.�_�t�8pa�4 }�3B�e푊]�<�t�zCΘ� x��� �M`�b�~�I�˖Ca�Gm�|�wyj���E=��U��T�G)5im�Zg�r:0�t7��H1>��*ۄ� �����.W�V���9����4Aya����x�EPm֪�m<=�1�Uކ�A�+Bjѡ\]|�wx��R�H�Q���k���@��Έel0B�#�8X�q�E��*pJŇ9`�n�D�9t�΃�?�Q佝[��y���^�O��Կ�u�2`۵vY�r{�q�Ƶ���r�n�����a
��׷�;���(źSU^1~gH+ˊ0v7 �׶G�A�)�H���Qs�$�G��Tټ��G�LMo?8��o�p�      #   �   x�u�M
�0���)�lA��x���{� ��'�?Ѡ�^�͍|M\ZH���7�MfjI����F�`ǒ�ʖU��1j�8%j��ŝ��pգ��Z|�H��T2<�nR����İ.��`�0e��#����t��>�zc�$紡�>Q�!S�?�M��c}���:��&Q��Ȇ)����;g�-�aQCY��'J�/���      $   �   x�u��	�0D�7�H���\1�?��u ���b��n�H�Ǽ����o�p`#/�d�u��V�q��%���48I1�2�FPc�=69o�����/-���Pk)�K{e�1�5�r.Yا1���g�H      %   �  x����N�@�ϓ��ؚ�q�� \�("K�*qs �+�TE(-�R{6i\E��W�}��o�n0 �/ޝݙ�~�J"��H~J)wR�BJ��[�ʽ�L���̡L���t�ɥ�/S���'7�B�؄́͗{
5w���>��:Q�n��v��/�[Y��a�-�g��<X�{M_I!��j
Y%$W�<AU[}&����0G�a'3���ޗR-���J�NE%��ҊY��r
�k+�l�uBQ�ܵs�=�{��Ǩ6��DN�|� �`��b��Z�q�zc=�	v�hy��ml�������W�ń���]#���#E��q	���o:˰i3���oY=9��3�a��.�fQk�^ؕ�.�5�}�[Y��R�ʯ]�|v.���G��O��S��[r�5%-�o���)<����B�a��&R/aR���d�j�	�M�Ф@�9m�ܛ4+A��y�Z��      &   �  x��TAR�@<�W�Z$�n�^|L�����D �%I����,KD��B�N��Lw8���~ȝM���I)�6��6�"J���R��)�U9�j^>��J�l��5��w��I �(� a���ET�`��ۀ�c�r��j"U@�b �����/�ݟ�r�p�[�FX�d���s֪�����tc�R��#�=\�d�{4仪Ӈz�x�0 '��%JV�Bh��.��퓔sH�b�I�f���V�+bA�&9�����=֮�����8})ː�u{�nw�����<^Ψ�%�F�(t&�M�*��%��8V�ŇN.�Mco���1��%�����M�Qw�� jު,�x�N��wP��V�����{ƣt�}��y;�.�?���F�
x�,0�)�KT ��lw�7�jD5����_�N/G�����ǜc*ox����y<h�\���d��&y�j�r�h��v�'���z�o6��|     