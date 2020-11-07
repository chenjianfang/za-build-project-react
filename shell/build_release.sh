#!/bin/bash
branch=$1 #第一个参数默认为分支
buildParams=${@:2} #获取第二个及以后的参数
CONID='zafe'
CONKEY='zafezafe'

if [[ "$buildParams" == '' ]]
then
 echo "请输入构建参数"
 exit
fi

cd "$(dirname $0)/../" || exit
git checkout .
if [ $branch ]
then
  expect -c "spawn git fetch origin; expect \"*Username*\" { send \"${CONID}\n\"; exp_continue } \"*Password*\" { send \"${CONKEY}\n\" };interact";
  git rev-parse --quiet --verify $branch && git checkout $branch;

  expect -c "spawn git pull --no-edit origin ${branch}; expect \"*Username*\" { send \"${CONID}\n\"; exp_continue } \"*Password*\" { send \"${CONKEY}\n\" };interact";
  npm install;
  npx za-build-react "$buildParams"
fi
