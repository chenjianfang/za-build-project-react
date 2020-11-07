#!/bin/bash
CONID='zafe'
CONKEY='zafezafe'
buildConfigFile='build.config.json'

cd "$(dirname $0)/../" || exit

if [ ! -f $buildConfigFile ]; then
  exit
fi

sourcemapName=$(cat $buildConfigFile | awk -F "[:]" '/sourcemapName/{print$2}' | awk -F "[,]" '{print$1}' | sed 's/\"//g' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g')

git checkout .
expect -c "spawn git fetch origin; expect \"*Username*\" { send \"${CONID}\n\"; exp_continue } \"*Password*\" { send \"${CONKEY}\n\" };interact";

tagStr=`git tag -l`
# 切割成数组
OLD_IFS="$IFS"
IFS=" " read -r -a array <<< "$tagStr"
arr=($tagStr)
IFS="$OLD_IFS"

echo "tag length: ${#arr[@]}"

resultTag="1"

if [ ${#arr[@]} -gt 0 ]
then
  # 有tag
  #取最大值
  MAX=${arr[0]}
  for I in "${!arr[@]}";
  do
    if [[ ${MAX} -le ${arr[${I}]} ]];then
      MAX=${arr[${I}]}
    fi
  done
  resultTag=`expr $MAX + 1`
else
  # 没有tag
  resultTag="1"
fi

echo "new tag: $resultTag"

git tag -a $resultTag -m "tag $resultTag"
expect -c "spawn git push origin $resultTag; expect \"*Username*\" { send \"${CONID}\n\"; exp_continue } \"*Password*\" { send \"${CONKEY}\n\" };interact";

mkdir -p /data/web/codeview/files/$sourcemapName/$resultTag
rsync -avz dist/ /data/web/codeview/files/$sourcemapName/$resultTag
