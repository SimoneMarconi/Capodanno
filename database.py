import sqlite3

# con = sqlite3.connect("test.db")
# cur = con.cursor()
# cur.execute(
#     """
# CREATE TABLE coppie(primo VARCHAR(30), secondo VARCHAR(30))
# """
# )
# con.commit()

# cur.execute("CREATE TABLE persone(nome VARCHAR(50), punti INT)")
# cur.execute("INSERT INTO persone VALUES ('simone', 100), ('federico', 22)")
# con.commit()
# res = cur.execute(
#     """
#         SELECT nome FROM persone
#         WHERE nome='simone'
#     """
# )
# res = res.fetchall()
# print(res)

# res = cur.execute(
#     """
# DROP TABLE persone
# """
# )
# res = cur.execute(
#     """
#         SELECT * FROM persone
#         WHERE nome='simone'
#     """
# )
# res = res.fetchall()
# print(res)


def init():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute(
        """
    CREATE TABLE coppie(primo VARCHAR(30), secondo VARCHAR(30))
    """
    )
    cur.execute("CREATE TABLE persone(nome VARCHAR(30))")
    con.commit()


def addPersona(name):
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute(
        f""" 
    INSERT INTO persone (nome) VALUES ('{name}') 
    """
    )
    con.commit()


def addCoppia(first, second):
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    print(f"INSERT INTO coppie(primo, secondo) VALUES ('{first}', '{second}')")
    cur.execute(
        f""" 
    INSERT INTO coppie(primo, secondo) VALUES ('{first}', '{second}') 
    """
    )
    con.commit()


def getPersone():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute(
        """
    SELECT * FROM persone
    """
    )
    res = cur.fetchall()
    return res


def clearPersone():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute(
        """
        DELETE FROM persone;
        """
    )
    con.commit()


def clearCoppie():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    cur.execute(
        """
        DELETE FROM coppie;
        """
    )
    con.commit()


def checkPersone():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    res = cur.execute(
        """
        SELECT * FROM persone;
        """
    )
    print(res.fetchall())


def checkCoppie():
    con = sqlite3.connect("test.db")
    cur = con.cursor()
    res = cur.execute(
        """
        SELECT * FROM coppie;
        """
    )
    print(res.fetchall())


# init()
# clearCoppie()
# addCoppia("uno", "due")
# checkCoppie()
# clearPersone()
# check()
