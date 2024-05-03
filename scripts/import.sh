#!/bin/sh
# RUN INIT DEFAULT (imports alice, bob, issuer):
# ./scripts/import.sh
# OR RUN IMPORT OF AN INDIVIDUAL PERSONA:
# ./scripts/import.sh [alice/bob/issuer]

ARG1=$1;

ALICEENVPATH=".env.nice-agent-alice.local"
BOBENVPATH=".env.nice-agent-bob.local"
ISSUERENVPATH=".env.nice-agent-issuer.local"

ALICECLOUDAGENT=http://localhost:3010
BOBCLOUDAGENT=http://localhost:3011
ISSUERCLOUDAGENT=http://localhost:3012


assert_env() {
	DID=
	PRIVATE_KEY=
	ENVPATH=$1
	echo "AssertEnv $ENVPATH"
	source $ENVPATH
	if [ -z "$DID" ]; then
		echo "Missing DID in $ENVPATH"
		return 1
	fi

	if [ -z "$PRIVATE_KEY" ]; then
		echo "Missing PRIVATE_KEY in $ENVPATH"
		return 1
	fi
}

import_did() {
	CLOUDAGENT=$1
	echo "Importing DID to $CLOUDAGENT";
	URL=${CLOUDAGENT}/dids/import;
	HEADER='Content-Type: application/json';
	DATA="{\"did\":\"$DID\",\"privateKeys\":[{\"keyType\":\"ed25519\",\"privateKey\":\"$PRIVATE_KEY\"}]}";
	RESPONSE=$(curl -s -w "\n%{http_code}" -X POST -H "$HEADER" -d "$DATA" "$URL")

	RESPONSE_CODE=$(tail -n1 <<< "$RESPONSE")  
	RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 

	if [ "$RESPONSE_CODE" == "000" ]; then
		echo error curling $CLOUDAGENT, is it running?
	elif [ "$RESPONSE_CODE" != "200" ]; then
		echo Error!;
		echo $RESPONSE_BODY;
	else
		echo Success;
	fi
}

if [ "$ARG1" == "alice" ] || [ -z "$ARG1" ]; then
    if assert_env $ALICEENVPATH; then
        import_did $ALICECLOUDAGENT
    fi
fi

if [ "$ARG1" == "bob" ] || [ -z "$ARG1" ]; then
	if assert_env $BOBENVPATH; then
		import_did $BOBCLOUDAGENT;
	fi
fi

if [ "$ARG1" == "issuer" ] || [ -z "$ARG1" ]; then
	if assert_env $ISSUERENVPATH; then
		import_did $ISSUERCLOUDAGENT;
	fi
fi